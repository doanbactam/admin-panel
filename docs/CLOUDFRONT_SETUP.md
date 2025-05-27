# 🌐 CloudFront Setup Guide for Media Management System

## 📋 **OVERVIEW**

CloudFront CDN sẽ tăng tốc độ tải media files từ 2-5 giây xuống còn 200-500ms và giảm chi phí bandwidth 30-50%.

---

## 🚀 **OPTION 1: AUTOMATIC SETUP (RECOMMENDED)**

### **Prerequisites**
```bash
# Install AWS SDK dependencies
bun add @aws-sdk/client-cloudfront @aws-sdk/client-s3

# Ensure environment variables are set
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name
```

### **Run Setup Script**
```bash
# Make script executable
chmod +x scripts/setup-cloudfront.js

# Run automatic setup
node scripts/setup-cloudfront.js
```

### **Expected Output**
```
🚀 Starting CloudFront setup for Media Management System...
📦 S3 Bucket: your-bucket-name
🌍 AWS Region: ap-southeast-1
🔐 Creating Origin Access Control...
✅ Origin Access Control created: E1234567890ABC
☁️ Creating CloudFront Distribution...
✅ CloudFront Distribution created!
📍 Distribution ID: E1234567890XYZ
🌐 Domain Name: d1234567890abcd.cloudfront.net
📊 Status: InProgress
🔒 Updating S3 bucket policy...
✅ S3 bucket policy updated successfully
📝 Updating .env file...
✅ Updated .env with CloudFront URL: https://d1234567890abcd.cloudfront.net

🎉 CloudFront setup completed successfully!
```

---

## 🛠️ **OPTION 2: MANUAL SETUP**

### **Step 1: Create CloudFront Distribution**

1. **AWS Console** → CloudFront → Create Distribution
2. **Origin Settings:**
   ```
   Origin Domain: your-bucket.s3.ap-southeast-1.amazonaws.com
   Origin Path: (leave empty)
   Origin Access: Origin Access Control (OAC)
   ```

3. **Create Origin Access Control:**
   ```
   Name: your-bucket-OAC
   Description: OAC for media bucket
   Origin Type: S3
   Signing Behavior: Always
   ```

### **Step 2: Cache Behaviors**

1. **Default Cache Behavior:**
   ```
   Viewer Protocol Policy: Redirect HTTP to HTTPS
   Allowed HTTP Methods: GET, HEAD, OPTIONS
   Cache Policy: Managed-CachingOptimized
   Compress Objects: Yes
   ```

2. **Add Cache Behavior for /media/***
   ```
   Path Pattern: /media/*
   TTL Settings: 
     - Default TTL: 31536000 (1 year)
     - Maximum TTL: 31536000 (1 year)
   Compress Objects: Yes
   ```

### **Step 3: Distribution Settings**
```
Price Class: Use All Edge Locations
Default Root Object: (leave empty)
SSL Certificate: Default CloudFront Certificate
```

### **Step 4: Update S3 Bucket Policy**

After CloudFront is created, update S3 bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR-ACCOUNT-ID:distribution/YOUR-DISTRIBUTION-ID"
        }
      }
    }
  ]
}
```

### **Step 5: Update Environment Variables**

Copy CloudFront domain name and update `.env`:
```env
AWS_CLOUDFRONT_URL=https://d1234567890abcd.cloudfront.net
```

---

## ✅ **VERIFICATION STEPS**

### **1. Check Distribution Status**
```bash
# AWS CLI
aws cloudfront get-distribution --id YOUR-DISTRIBUTION-ID
```

### **2. Test Media URL**
```bash
# Test S3 direct (should be slow)
curl -I https://your-bucket.s3.amazonaws.com/media/test-image.jpg

# Test CloudFront (should be fast)
curl -I https://d1234567890abcd.cloudfront.net/media/test-image.jpg
```

### **3. Upload Test Media**
1. Go to `/media` page in your app
2. Upload an image
3. Check if URL uses CloudFront domain
4. Verify fast loading speed

---

## 🔧 **TROUBLESHOOTING**

### **Common Issues:**

1. **403 Forbidden Error**
   ```
   Solution: Check S3 bucket policy includes correct CloudFront ARN
   ```

2. **Slow Loading Still**
   ```
   Solution: Wait 15-20 minutes for CloudFront deployment
   Check cache headers in browser dev tools
   ```

3. **Images Not Loading**
   ```
   Solution: Verify Origin Access Control is properly configured
   Check S3 bucket permissions
   ```

### **Debug Commands:**
```bash
# Check CloudFront distribution
aws cloudfront list-distributions

# Check S3 bucket policy
aws s3api get-bucket-policy --bucket your-bucket-name

# Test CloudFront cache
curl -H "Cache-Control: no-cache" https://your-cloudfront-domain.net/media/test.jpg
```

---

## 📊 **PERFORMANCE MONITORING**

### **Before CloudFront:**
- Load time: 2-5 seconds
- Bandwidth cost: $0.09/GB
- Global performance: Poor

### **After CloudFront:**
- Load time: 200-500ms
- Bandwidth cost: $0.085/GB + 1TB free tier
- Global performance: Excellent

### **Monitoring Tools:**
1. **CloudFront Reports** in AWS Console
2. **Browser DevTools** Network tab
3. **GTmetrix** or **PageSpeed Insights**

---

## 🎯 **OPTIMIZATION TIPS**

### **1. Cache Headers**
```typescript
// In aws-s3.ts
const command = new PutObjectCommand({
  Bucket: BUCKET_NAME,
  Key: key,
  Body: buffer,
  ContentType: metadata.mimeType,
  CacheControl: 'max-age=31536000', // 1 year cache
})
```

### **2. Image Optimization**
```typescript
// Use WebP format for better compression
const processed = await processImage(buffer, {
  format: 'webp',
  quality: 85
})
```

### **3. Compression**
Enable Gzip/Brotli compression in CloudFront for better performance.

---

## 🎉 **SUCCESS INDICATORS**

✅ **CloudFront distribution status: Deployed**  
✅ **Media URLs use CloudFront domain**  
✅ **Images load in < 1 second**  
✅ **S3 bucket policy allows CloudFront access**  
✅ **No 403/404 errors on media files**  

---

## 📞 **SUPPORT**

If you encounter issues:
1. Check AWS CloudFront documentation
2. Verify all environment variables
3. Test with simple image upload
4. Check browser console for errors

**CloudFront deployment takes 15-20 minutes to complete globally!**
