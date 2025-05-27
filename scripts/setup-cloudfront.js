#!/usr/bin/env node

/**
 * CloudFront Distribution Setup Script
 * Tự động tạo CloudFront distribution cho Media Management System
 */

const { CloudFrontClient, CreateDistributionCommand, CreateOriginAccessControlCommand } = require('@aws-sdk/client-cloudfront')
const { S3Client, PutBucketPolicyCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config()

const cloudfront = new CloudFrontClient({ 
  region: 'us-east-1', // CloudFront is global but uses us-east-1
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
})

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET

async function createOriginAccessControl() {
  console.log('🔐 Creating Origin Access Control...')
  
  const command = new CreateOriginAccessControlCommand({
    OriginAccessControlConfig: {
      Name: `${BUCKET_NAME}-OAC`,
      Description: `Origin Access Control for ${BUCKET_NAME} media bucket`,
      OriginAccessControlOriginType: 's3',
      SigningBehavior: 'always',
      SigningProtocol: 'sigv4'
    }
  })

  try {
    const response = await cloudfront.send(command)
    console.log('✅ Origin Access Control created:', response.OriginAccessControl.Id)
    return response.OriginAccessControl.Id
  } catch (error) {
    console.error('❌ Error creating OAC:', error.message)
    throw error
  }
}

async function createCloudFrontDistribution(oacId) {
  console.log('☁️ Creating CloudFront Distribution...')
  
  const distributionConfig = {
    CallerReference: `${BUCKET_NAME}-${Date.now()}`,
    Comment: `CDN for ${BUCKET_NAME} media files`,
    DefaultRootObject: '',
    Origins: {
      Quantity: 1,
      Items: [
        {
          Id: `S3-${BUCKET_NAME}`,
          DomainName: `${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
          S3OriginConfig: {
            OriginAccessIdentity: ''
          },
          OriginAccessControlId: oacId
        }
      ]
    },
    DefaultCacheBehavior: {
      TargetOriginId: `S3-${BUCKET_NAME}`,
      ViewerProtocolPolicy: 'redirect-to-https',
      MinTTL: 0,
      DefaultTTL: 86400, // 1 day
      MaxTTL: 31536000, // 1 year
      Compress: true,
      ForwardedValues: {
        QueryString: false,
        Cookies: {
          Forward: 'none'
        }
      },
      TrustedSigners: {
        Enabled: false,
        Quantity: 0
      }
    },
    CacheBehaviors: {
      Quantity: 1,
      Items: [
        {
          PathPattern: '/media/*',
          TargetOriginId: `S3-${BUCKET_NAME}`,
          ViewerProtocolPolicy: 'redirect-to-https',
          MinTTL: 0,
          DefaultTTL: 31536000, // 1 year for media files
          MaxTTL: 31536000,
          Compress: true,
          ForwardedValues: {
            QueryString: false,
            Cookies: {
              Forward: 'none'
            }
          },
          TrustedSigners: {
            Enabled: false,
            Quantity: 0
          }
        }
      ]
    },
    Enabled: true,
    PriceClass: 'PriceClass_All'
  }

  const command = new CreateDistributionCommand({
    DistributionConfig: distributionConfig
  })

  try {
    const response = await cloudfront.send(command)
    const distribution = response.Distribution
    
    console.log('✅ CloudFront Distribution created!')
    console.log(`📍 Distribution ID: ${distribution.Id}`)
    console.log(`🌐 Domain Name: ${distribution.DomainName}`)
    console.log(`📊 Status: ${distribution.Status}`)
    
    return {
      id: distribution.Id,
      domainName: distribution.DomainName,
      arn: distribution.ARN
    }
  } catch (error) {
    console.error('❌ Error creating CloudFront distribution:', error.message)
    throw error
  }
}

async function updateS3BucketPolicy(distributionArn) {
  console.log('🔒 Updating S3 bucket policy...')
  
  const bucketPolicy = {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'AllowCloudFrontServicePrincipal',
        Effect: 'Allow',
        Principal: {
          Service: 'cloudfront.amazonaws.com'
        },
        Action: 's3:GetObject',
        Resource: `arn:aws:s3:::${BUCKET_NAME}/*`,
        Condition: {
          StringEquals: {
            'AWS:SourceArn': distributionArn
          }
        }
      }
    ]
  }

  const command = new PutBucketPolicyCommand({
    Bucket: BUCKET_NAME,
    Policy: JSON.stringify(bucketPolicy)
  })

  try {
    await s3.send(command)
    console.log('✅ S3 bucket policy updated successfully')
  } catch (error) {
    console.error('❌ Error updating S3 bucket policy:', error.message)
    throw error
  }
}

async function updateEnvFile(domainName) {
  console.log('📝 Updating .env file...')
  
  const envPath = path.join(process.cwd(), '.env')
  let envContent = fs.readFileSync(envPath, 'utf8')
  
  // Update CloudFront URL
  const cloudfrontUrl = `https://${domainName}`
  envContent = envContent.replace(
    /AWS_CLOUDFRONT_URL=.*/,
    `AWS_CLOUDFRONT_URL=${cloudfrontUrl}`
  )
  
  fs.writeFileSync(envPath, envContent)
  console.log(`✅ Updated .env with CloudFront URL: ${cloudfrontUrl}`)
}

async function main() {
  try {
    console.log('🚀 Starting CloudFront setup for Media Management System...')
    console.log(`📦 S3 Bucket: ${BUCKET_NAME}`)
    console.log(`🌍 AWS Region: ${process.env.AWS_REGION}`)
    
    // Step 1: Create Origin Access Control
    const oacId = await createOriginAccessControl()
    
    // Step 2: Create CloudFront Distribution
    const distribution = await createCloudFrontDistribution(oacId)
    
    // Step 3: Update S3 Bucket Policy
    await updateS3BucketPolicy(distribution.arn)
    
    // Step 4: Update .env file
    await updateEnvFile(distribution.domainName)
    
    console.log('\n🎉 CloudFront setup completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Wait 15-20 minutes for CloudFront deployment to complete')
    console.log('2. Test media upload in your application')
    console.log('3. Verify images load from CloudFront URL')
    console.log(`\n🌐 Your CloudFront URL: https://${distribution.domainName}`)
    
  } catch (error) {
    console.error('\n❌ CloudFront setup failed:', error.message)
    process.exit(1)
  }
}

// Validate environment variables
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_BUCKET) {
  console.error('❌ Missing required environment variables:')
  console.error('- AWS_ACCESS_KEY_ID')
  console.error('- AWS_SECRET_ACCESS_KEY') 
  console.error('- AWS_S3_BUCKET')
  process.exit(1)
}

main()
