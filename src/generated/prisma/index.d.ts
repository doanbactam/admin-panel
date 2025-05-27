
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model SocialAccount
 * 
 */
export type SocialAccount = $Result.DefaultSelection<Prisma.$SocialAccountPayload>
/**
 * Model Page
 * 
 */
export type Page = $Result.DefaultSelection<Prisma.$PagePayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model PostPage
 * 
 */
export type PostPage = $Result.DefaultSelection<Prisma.$PostPagePayload>
/**
 * Model PostAnalytics
 * 
 */
export type PostAnalytics = $Result.DefaultSelection<Prisma.$PostAnalyticsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PostStatus: {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  PUBLISHED: 'PUBLISHED',
  FAILED: 'FAILED'
};

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]


export const PostPageStatus: {
  PENDING: 'PENDING',
  SCHEDULED: 'SCHEDULED',
  PUBLISHED: 'PUBLISHED',
  FAILED: 'FAILED'
};

export type PostPageStatus = (typeof PostPageStatus)[keyof typeof PostPageStatus]

}

export type PostStatus = $Enums.PostStatus

export const PostStatus: typeof $Enums.PostStatus

export type PostPageStatus = $Enums.PostPageStatus

export const PostPageStatus: typeof $Enums.PostPageStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.socialAccount`: Exposes CRUD operations for the **SocialAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SocialAccounts
    * const socialAccounts = await prisma.socialAccount.findMany()
    * ```
    */
  get socialAccount(): Prisma.SocialAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postPage`: Exposes CRUD operations for the **PostPage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostPages
    * const postPages = await prisma.postPage.findMany()
    * ```
    */
  get postPage(): Prisma.PostPageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postAnalytics`: Exposes CRUD operations for the **PostAnalytics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostAnalytics
    * const postAnalytics = await prisma.postAnalytics.findMany()
    * ```
    */
  get postAnalytics(): Prisma.PostAnalyticsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    SocialAccount: 'SocialAccount',
    Page: 'Page',
    Post: 'Post',
    PostPage: 'PostPage',
    PostAnalytics: 'PostAnalytics'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "socialAccount" | "page" | "post" | "postPage" | "postAnalytics"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      SocialAccount: {
        payload: Prisma.$SocialAccountPayload<ExtArgs>
        fields: Prisma.SocialAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SocialAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SocialAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload>
          }
          findFirst: {
            args: Prisma.SocialAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SocialAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload>
          }
          findMany: {
            args: Prisma.SocialAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload>[]
          }
          create: {
            args: Prisma.SocialAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload>
          }
          createMany: {
            args: Prisma.SocialAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SocialAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload>[]
          }
          delete: {
            args: Prisma.SocialAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload>
          }
          update: {
            args: Prisma.SocialAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload>
          }
          deleteMany: {
            args: Prisma.SocialAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SocialAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SocialAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload>[]
          }
          upsert: {
            args: Prisma.SocialAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAccountPayload>
          }
          aggregate: {
            args: Prisma.SocialAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSocialAccount>
          }
          groupBy: {
            args: Prisma.SocialAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<SocialAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.SocialAccountCountArgs<ExtArgs>
            result: $Utils.Optional<SocialAccountCountAggregateOutputType> | number
          }
        }
      }
      Page: {
        payload: Prisma.$PagePayload<ExtArgs>
        fields: Prisma.PageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findFirst: {
            args: Prisma.PageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findMany: {
            args: Prisma.PageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          create: {
            args: Prisma.PageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          createMany: {
            args: Prisma.PageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          delete: {
            args: Prisma.PageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          update: {
            args: Prisma.PageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          deleteMany: {
            args: Prisma.PageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          upsert: {
            args: Prisma.PageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          aggregate: {
            args: Prisma.PageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePage>
          }
          groupBy: {
            args: Prisma.PageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageCountArgs<ExtArgs>
            result: $Utils.Optional<PageCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      PostPage: {
        payload: Prisma.$PostPagePayload<ExtArgs>
        fields: Prisma.PostPageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostPageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostPageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload>
          }
          findFirst: {
            args: Prisma.PostPageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostPageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload>
          }
          findMany: {
            args: Prisma.PostPageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload>[]
          }
          create: {
            args: Prisma.PostPageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload>
          }
          createMany: {
            args: Prisma.PostPageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostPageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload>[]
          }
          delete: {
            args: Prisma.PostPageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload>
          }
          update: {
            args: Prisma.PostPageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload>
          }
          deleteMany: {
            args: Prisma.PostPageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostPageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostPageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload>[]
          }
          upsert: {
            args: Prisma.PostPageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPagePayload>
          }
          aggregate: {
            args: Prisma.PostPageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostPage>
          }
          groupBy: {
            args: Prisma.PostPageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostPageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostPageCountArgs<ExtArgs>
            result: $Utils.Optional<PostPageCountAggregateOutputType> | number
          }
        }
      }
      PostAnalytics: {
        payload: Prisma.$PostAnalyticsPayload<ExtArgs>
        fields: Prisma.PostAnalyticsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostAnalyticsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostAnalyticsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload>
          }
          findFirst: {
            args: Prisma.PostAnalyticsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostAnalyticsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload>
          }
          findMany: {
            args: Prisma.PostAnalyticsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload>[]
          }
          create: {
            args: Prisma.PostAnalyticsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload>
          }
          createMany: {
            args: Prisma.PostAnalyticsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostAnalyticsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload>[]
          }
          delete: {
            args: Prisma.PostAnalyticsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload>
          }
          update: {
            args: Prisma.PostAnalyticsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload>
          }
          deleteMany: {
            args: Prisma.PostAnalyticsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostAnalyticsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostAnalyticsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload>[]
          }
          upsert: {
            args: Prisma.PostAnalyticsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostAnalyticsPayload>
          }
          aggregate: {
            args: Prisma.PostAnalyticsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostAnalytics>
          }
          groupBy: {
            args: Prisma.PostAnalyticsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostAnalyticsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostAnalyticsCountArgs<ExtArgs>
            result: $Utils.Optional<PostAnalyticsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    socialAccount?: SocialAccountOmit
    page?: PageOmit
    post?: PostOmit
    postPage?: PostPageOmit
    postAnalytics?: PostAnalyticsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    socialAccounts: number
    posts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialAccounts?: boolean | UserCountOutputTypeCountSocialAccountsArgs
    posts?: boolean | UserCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSocialAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialAccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type SocialAccountCountOutputType
   */

  export type SocialAccountCountOutputType = {
    pages: number
  }

  export type SocialAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pages?: boolean | SocialAccountCountOutputTypeCountPagesArgs
  }

  // Custom InputTypes
  /**
   * SocialAccountCountOutputType without action
   */
  export type SocialAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccountCountOutputType
     */
    select?: SocialAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SocialAccountCountOutputType without action
   */
  export type SocialAccountCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }


  /**
   * Count Type PageCountOutputType
   */

  export type PageCountOutputType = {
    postPages: number
  }

  export type PageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postPages?: boolean | PageCountOutputTypeCountPostPagesArgs
  }

  // Custom InputTypes
  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageCountOutputType
     */
    select?: PageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeCountPostPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostPageWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    postPages: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postPages?: boolean | PostCountOutputTypeCountPostPagesArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountPostPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostPageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerkId: number
    email: number
    name: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    clerkId: string
    email: string
    name: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socialAccounts?: boolean | User$socialAccountsArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkId" | "email" | "name" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialAccounts?: boolean | User$socialAccountsArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      socialAccounts: Prisma.$SocialAccountPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkId: string
      email: string
      name: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    socialAccounts<T extends User$socialAccountsArgs<ExtArgs> = {}>(args?: Subset<T, User$socialAccountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.socialAccounts
   */
  export type User$socialAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    where?: SocialAccountWhereInput
    orderBy?: SocialAccountOrderByWithRelationInput | SocialAccountOrderByWithRelationInput[]
    cursor?: SocialAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SocialAccountScalarFieldEnum | SocialAccountScalarFieldEnum[]
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model SocialAccount
   */

  export type AggregateSocialAccount = {
    _count: SocialAccountCountAggregateOutputType | null
    _min: SocialAccountMinAggregateOutputType | null
    _max: SocialAccountMaxAggregateOutputType | null
  }

  export type SocialAccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    accountId: string | null
    accountName: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    scope: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SocialAccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: string | null
    accountId: string | null
    accountName: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    scope: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SocialAccountCountAggregateOutputType = {
    id: number
    userId: number
    platform: number
    accountId: number
    accountName: number
    accessToken: number
    refreshToken: number
    expiresAt: number
    scope: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SocialAccountMinAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    accountId?: true
    accountName?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    scope?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SocialAccountMaxAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    accountId?: true
    accountName?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    scope?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SocialAccountCountAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    accountId?: true
    accountName?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    scope?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SocialAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SocialAccount to aggregate.
     */
    where?: SocialAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialAccounts to fetch.
     */
    orderBy?: SocialAccountOrderByWithRelationInput | SocialAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SocialAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SocialAccounts
    **/
    _count?: true | SocialAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SocialAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SocialAccountMaxAggregateInputType
  }

  export type GetSocialAccountAggregateType<T extends SocialAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateSocialAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSocialAccount[P]>
      : GetScalarType<T[P], AggregateSocialAccount[P]>
  }




  export type SocialAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialAccountWhereInput
    orderBy?: SocialAccountOrderByWithAggregationInput | SocialAccountOrderByWithAggregationInput[]
    by: SocialAccountScalarFieldEnum[] | SocialAccountScalarFieldEnum
    having?: SocialAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SocialAccountCountAggregateInputType | true
    _min?: SocialAccountMinAggregateInputType
    _max?: SocialAccountMaxAggregateInputType
  }

  export type SocialAccountGroupByOutputType = {
    id: string
    userId: string
    platform: string
    accountId: string
    accountName: string | null
    accessToken: string
    refreshToken: string | null
    expiresAt: Date | null
    scope: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SocialAccountCountAggregateOutputType | null
    _min: SocialAccountMinAggregateOutputType | null
    _max: SocialAccountMaxAggregateOutputType | null
  }

  type GetSocialAccountGroupByPayload<T extends SocialAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SocialAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SocialAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SocialAccountGroupByOutputType[P]>
            : GetScalarType<T[P], SocialAccountGroupByOutputType[P]>
        }
      >
    >


  export type SocialAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    accountId?: boolean
    accountName?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    scope?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pages?: boolean | SocialAccount$pagesArgs<ExtArgs>
    _count?: boolean | SocialAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialAccount"]>

  export type SocialAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    accountId?: boolean
    accountName?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    scope?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialAccount"]>

  export type SocialAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    accountId?: boolean
    accountName?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    scope?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialAccount"]>

  export type SocialAccountSelectScalar = {
    id?: boolean
    userId?: boolean
    platform?: boolean
    accountId?: boolean
    accountName?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    scope?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SocialAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "platform" | "accountId" | "accountName" | "accessToken" | "refreshToken" | "expiresAt" | "scope" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["socialAccount"]>
  export type SocialAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pages?: boolean | SocialAccount$pagesArgs<ExtArgs>
    _count?: boolean | SocialAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SocialAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SocialAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SocialAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SocialAccount"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      pages: Prisma.$PagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      platform: string
      accountId: string
      accountName: string | null
      accessToken: string
      refreshToken: string | null
      expiresAt: Date | null
      scope: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["socialAccount"]>
    composites: {}
  }

  type SocialAccountGetPayload<S extends boolean | null | undefined | SocialAccountDefaultArgs> = $Result.GetResult<Prisma.$SocialAccountPayload, S>

  type SocialAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SocialAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SocialAccountCountAggregateInputType | true
    }

  export interface SocialAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SocialAccount'], meta: { name: 'SocialAccount' } }
    /**
     * Find zero or one SocialAccount that matches the filter.
     * @param {SocialAccountFindUniqueArgs} args - Arguments to find a SocialAccount
     * @example
     * // Get one SocialAccount
     * const socialAccount = await prisma.socialAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SocialAccountFindUniqueArgs>(args: SelectSubset<T, SocialAccountFindUniqueArgs<ExtArgs>>): Prisma__SocialAccountClient<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SocialAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SocialAccountFindUniqueOrThrowArgs} args - Arguments to find a SocialAccount
     * @example
     * // Get one SocialAccount
     * const socialAccount = await prisma.socialAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SocialAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, SocialAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SocialAccountClient<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SocialAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAccountFindFirstArgs} args - Arguments to find a SocialAccount
     * @example
     * // Get one SocialAccount
     * const socialAccount = await prisma.socialAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SocialAccountFindFirstArgs>(args?: SelectSubset<T, SocialAccountFindFirstArgs<ExtArgs>>): Prisma__SocialAccountClient<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SocialAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAccountFindFirstOrThrowArgs} args - Arguments to find a SocialAccount
     * @example
     * // Get one SocialAccount
     * const socialAccount = await prisma.socialAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SocialAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, SocialAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__SocialAccountClient<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SocialAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SocialAccounts
     * const socialAccounts = await prisma.socialAccount.findMany()
     * 
     * // Get first 10 SocialAccounts
     * const socialAccounts = await prisma.socialAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const socialAccountWithIdOnly = await prisma.socialAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SocialAccountFindManyArgs>(args?: SelectSubset<T, SocialAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SocialAccount.
     * @param {SocialAccountCreateArgs} args - Arguments to create a SocialAccount.
     * @example
     * // Create one SocialAccount
     * const SocialAccount = await prisma.socialAccount.create({
     *   data: {
     *     // ... data to create a SocialAccount
     *   }
     * })
     * 
     */
    create<T extends SocialAccountCreateArgs>(args: SelectSubset<T, SocialAccountCreateArgs<ExtArgs>>): Prisma__SocialAccountClient<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SocialAccounts.
     * @param {SocialAccountCreateManyArgs} args - Arguments to create many SocialAccounts.
     * @example
     * // Create many SocialAccounts
     * const socialAccount = await prisma.socialAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SocialAccountCreateManyArgs>(args?: SelectSubset<T, SocialAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SocialAccounts and returns the data saved in the database.
     * @param {SocialAccountCreateManyAndReturnArgs} args - Arguments to create many SocialAccounts.
     * @example
     * // Create many SocialAccounts
     * const socialAccount = await prisma.socialAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SocialAccounts and only return the `id`
     * const socialAccountWithIdOnly = await prisma.socialAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SocialAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, SocialAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SocialAccount.
     * @param {SocialAccountDeleteArgs} args - Arguments to delete one SocialAccount.
     * @example
     * // Delete one SocialAccount
     * const SocialAccount = await prisma.socialAccount.delete({
     *   where: {
     *     // ... filter to delete one SocialAccount
     *   }
     * })
     * 
     */
    delete<T extends SocialAccountDeleteArgs>(args: SelectSubset<T, SocialAccountDeleteArgs<ExtArgs>>): Prisma__SocialAccountClient<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SocialAccount.
     * @param {SocialAccountUpdateArgs} args - Arguments to update one SocialAccount.
     * @example
     * // Update one SocialAccount
     * const socialAccount = await prisma.socialAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SocialAccountUpdateArgs>(args: SelectSubset<T, SocialAccountUpdateArgs<ExtArgs>>): Prisma__SocialAccountClient<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SocialAccounts.
     * @param {SocialAccountDeleteManyArgs} args - Arguments to filter SocialAccounts to delete.
     * @example
     * // Delete a few SocialAccounts
     * const { count } = await prisma.socialAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SocialAccountDeleteManyArgs>(args?: SelectSubset<T, SocialAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SocialAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SocialAccounts
     * const socialAccount = await prisma.socialAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SocialAccountUpdateManyArgs>(args: SelectSubset<T, SocialAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SocialAccounts and returns the data updated in the database.
     * @param {SocialAccountUpdateManyAndReturnArgs} args - Arguments to update many SocialAccounts.
     * @example
     * // Update many SocialAccounts
     * const socialAccount = await prisma.socialAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SocialAccounts and only return the `id`
     * const socialAccountWithIdOnly = await prisma.socialAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SocialAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, SocialAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SocialAccount.
     * @param {SocialAccountUpsertArgs} args - Arguments to update or create a SocialAccount.
     * @example
     * // Update or create a SocialAccount
     * const socialAccount = await prisma.socialAccount.upsert({
     *   create: {
     *     // ... data to create a SocialAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SocialAccount we want to update
     *   }
     * })
     */
    upsert<T extends SocialAccountUpsertArgs>(args: SelectSubset<T, SocialAccountUpsertArgs<ExtArgs>>): Prisma__SocialAccountClient<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SocialAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAccountCountArgs} args - Arguments to filter SocialAccounts to count.
     * @example
     * // Count the number of SocialAccounts
     * const count = await prisma.socialAccount.count({
     *   where: {
     *     // ... the filter for the SocialAccounts we want to count
     *   }
     * })
    **/
    count<T extends SocialAccountCountArgs>(
      args?: Subset<T, SocialAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SocialAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SocialAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SocialAccountAggregateArgs>(args: Subset<T, SocialAccountAggregateArgs>): Prisma.PrismaPromise<GetSocialAccountAggregateType<T>>

    /**
     * Group by SocialAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SocialAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SocialAccountGroupByArgs['orderBy'] }
        : { orderBy?: SocialAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SocialAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SocialAccount model
   */
  readonly fields: SocialAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SocialAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SocialAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pages<T extends SocialAccount$pagesArgs<ExtArgs> = {}>(args?: Subset<T, SocialAccount$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SocialAccount model
   */
  interface SocialAccountFieldRefs {
    readonly id: FieldRef<"SocialAccount", 'String'>
    readonly userId: FieldRef<"SocialAccount", 'String'>
    readonly platform: FieldRef<"SocialAccount", 'String'>
    readonly accountId: FieldRef<"SocialAccount", 'String'>
    readonly accountName: FieldRef<"SocialAccount", 'String'>
    readonly accessToken: FieldRef<"SocialAccount", 'String'>
    readonly refreshToken: FieldRef<"SocialAccount", 'String'>
    readonly expiresAt: FieldRef<"SocialAccount", 'DateTime'>
    readonly scope: FieldRef<"SocialAccount", 'String'>
    readonly isActive: FieldRef<"SocialAccount", 'Boolean'>
    readonly createdAt: FieldRef<"SocialAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"SocialAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SocialAccount findUnique
   */
  export type SocialAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    /**
     * Filter, which SocialAccount to fetch.
     */
    where: SocialAccountWhereUniqueInput
  }

  /**
   * SocialAccount findUniqueOrThrow
   */
  export type SocialAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    /**
     * Filter, which SocialAccount to fetch.
     */
    where: SocialAccountWhereUniqueInput
  }

  /**
   * SocialAccount findFirst
   */
  export type SocialAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    /**
     * Filter, which SocialAccount to fetch.
     */
    where?: SocialAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialAccounts to fetch.
     */
    orderBy?: SocialAccountOrderByWithRelationInput | SocialAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SocialAccounts.
     */
    cursor?: SocialAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SocialAccounts.
     */
    distinct?: SocialAccountScalarFieldEnum | SocialAccountScalarFieldEnum[]
  }

  /**
   * SocialAccount findFirstOrThrow
   */
  export type SocialAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    /**
     * Filter, which SocialAccount to fetch.
     */
    where?: SocialAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialAccounts to fetch.
     */
    orderBy?: SocialAccountOrderByWithRelationInput | SocialAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SocialAccounts.
     */
    cursor?: SocialAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SocialAccounts.
     */
    distinct?: SocialAccountScalarFieldEnum | SocialAccountScalarFieldEnum[]
  }

  /**
   * SocialAccount findMany
   */
  export type SocialAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    /**
     * Filter, which SocialAccounts to fetch.
     */
    where?: SocialAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialAccounts to fetch.
     */
    orderBy?: SocialAccountOrderByWithRelationInput | SocialAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SocialAccounts.
     */
    cursor?: SocialAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialAccounts.
     */
    skip?: number
    distinct?: SocialAccountScalarFieldEnum | SocialAccountScalarFieldEnum[]
  }

  /**
   * SocialAccount create
   */
  export type SocialAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a SocialAccount.
     */
    data: XOR<SocialAccountCreateInput, SocialAccountUncheckedCreateInput>
  }

  /**
   * SocialAccount createMany
   */
  export type SocialAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SocialAccounts.
     */
    data: SocialAccountCreateManyInput | SocialAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SocialAccount createManyAndReturn
   */
  export type SocialAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * The data used to create many SocialAccounts.
     */
    data: SocialAccountCreateManyInput | SocialAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SocialAccount update
   */
  export type SocialAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a SocialAccount.
     */
    data: XOR<SocialAccountUpdateInput, SocialAccountUncheckedUpdateInput>
    /**
     * Choose, which SocialAccount to update.
     */
    where: SocialAccountWhereUniqueInput
  }

  /**
   * SocialAccount updateMany
   */
  export type SocialAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SocialAccounts.
     */
    data: XOR<SocialAccountUpdateManyMutationInput, SocialAccountUncheckedUpdateManyInput>
    /**
     * Filter which SocialAccounts to update
     */
    where?: SocialAccountWhereInput
    /**
     * Limit how many SocialAccounts to update.
     */
    limit?: number
  }

  /**
   * SocialAccount updateManyAndReturn
   */
  export type SocialAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * The data used to update SocialAccounts.
     */
    data: XOR<SocialAccountUpdateManyMutationInput, SocialAccountUncheckedUpdateManyInput>
    /**
     * Filter which SocialAccounts to update
     */
    where?: SocialAccountWhereInput
    /**
     * Limit how many SocialAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SocialAccount upsert
   */
  export type SocialAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the SocialAccount to update in case it exists.
     */
    where: SocialAccountWhereUniqueInput
    /**
     * In case the SocialAccount found by the `where` argument doesn't exist, create a new SocialAccount with this data.
     */
    create: XOR<SocialAccountCreateInput, SocialAccountUncheckedCreateInput>
    /**
     * In case the SocialAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SocialAccountUpdateInput, SocialAccountUncheckedUpdateInput>
  }

  /**
   * SocialAccount delete
   */
  export type SocialAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
    /**
     * Filter which SocialAccount to delete.
     */
    where: SocialAccountWhereUniqueInput
  }

  /**
   * SocialAccount deleteMany
   */
  export type SocialAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SocialAccounts to delete
     */
    where?: SocialAccountWhereInput
    /**
     * Limit how many SocialAccounts to delete.
     */
    limit?: number
  }

  /**
   * SocialAccount.pages
   */
  export type SocialAccount$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * SocialAccount without action
   */
  export type SocialAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAccount
     */
    select?: SocialAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAccount
     */
    omit?: SocialAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAccountInclude<ExtArgs> | null
  }


  /**
   * Model Page
   */

  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageMinAggregateOutputType = {
    id: string | null
    socialAccountId: string | null
    pageId: string | null
    name: string | null
    category: string | null
    about: string | null
    picture: string | null
    accessToken: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageMaxAggregateOutputType = {
    id: string | null
    socialAccountId: string | null
    pageId: string | null
    name: string | null
    category: string | null
    about: string | null
    picture: string | null
    accessToken: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageCountAggregateOutputType = {
    id: number
    socialAccountId: number
    pageId: number
    name: number
    category: number
    about: number
    picture: number
    accessToken: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PageMinAggregateInputType = {
    id?: true
    socialAccountId?: true
    pageId?: true
    name?: true
    category?: true
    about?: true
    picture?: true
    accessToken?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageMaxAggregateInputType = {
    id?: true
    socialAccountId?: true
    pageId?: true
    name?: true
    category?: true
    about?: true
    picture?: true
    accessToken?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageCountAggregateInputType = {
    id?: true
    socialAccountId?: true
    pageId?: true
    name?: true
    category?: true
    about?: true
    picture?: true
    accessToken?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Page to aggregate.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
    orderBy?: PageOrderByWithAggregationInput | PageOrderByWithAggregationInput[]
    by: PageScalarFieldEnum[] | PageScalarFieldEnum
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }

  export type PageGroupByOutputType = {
    id: string
    socialAccountId: string
    pageId: string
    name: string
    category: string | null
    about: string | null
    picture: string | null
    accessToken: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    socialAccountId?: boolean
    pageId?: boolean
    name?: boolean
    category?: boolean
    about?: boolean
    picture?: boolean
    accessToken?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socialAccount?: boolean | SocialAccountDefaultArgs<ExtArgs>
    postPages?: boolean | Page$postPagesArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    socialAccountId?: boolean
    pageId?: boolean
    name?: boolean
    category?: boolean
    about?: boolean
    picture?: boolean
    accessToken?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socialAccount?: boolean | SocialAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    socialAccountId?: boolean
    pageId?: boolean
    name?: boolean
    category?: boolean
    about?: boolean
    picture?: boolean
    accessToken?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socialAccount?: boolean | SocialAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectScalar = {
    id?: boolean
    socialAccountId?: boolean
    pageId?: boolean
    name?: boolean
    category?: boolean
    about?: boolean
    picture?: boolean
    accessToken?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "socialAccountId" | "pageId" | "name" | "category" | "about" | "picture" | "accessToken" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["page"]>
  export type PageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialAccount?: boolean | SocialAccountDefaultArgs<ExtArgs>
    postPages?: boolean | Page$postPagesArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialAccount?: boolean | SocialAccountDefaultArgs<ExtArgs>
  }
  export type PageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialAccount?: boolean | SocialAccountDefaultArgs<ExtArgs>
  }

  export type $PagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Page"
    objects: {
      socialAccount: Prisma.$SocialAccountPayload<ExtArgs>
      postPages: Prisma.$PostPagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      socialAccountId: string
      pageId: string
      name: string
      category: string | null
      about: string | null
      picture: string | null
      accessToken: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["page"]>
    composites: {}
  }

  type PageGetPayload<S extends boolean | null | undefined | PageDefaultArgs> = $Result.GetResult<Prisma.$PagePayload, S>

  type PageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PageCountAggregateInputType | true
    }

  export interface PageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Page'], meta: { name: 'Page' } }
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageFindUniqueArgs>(args: SelectSubset<T, PageFindUniqueArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Page that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs>(args: SelectSubset<T, PageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageFindFirstArgs>(args?: SelectSubset<T, PageFindFirstArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs>(args?: SelectSubset<T, PageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageWithIdOnly = await prisma.page.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PageFindManyArgs>(args?: SelectSubset<T, PageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
     */
    create<T extends PageCreateArgs>(args: SelectSubset<T, PageCreateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pages.
     * @param {PageCreateManyArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageCreateManyArgs>(args?: SelectSubset<T, PageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pages and returns the data saved in the database.
     * @param {PageCreateManyAndReturnArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PageCreateManyAndReturnArgs>(args?: SelectSubset<T, PageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
     */
    delete<T extends PageDeleteArgs>(args: SelectSubset<T, PageDeleteArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageUpdateArgs>(args: SelectSubset<T, PageUpdateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageDeleteManyArgs>(args?: SelectSubset<T, PageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageUpdateManyArgs>(args: SelectSubset<T, PageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages and returns the data updated in the database.
     * @param {PageUpdateManyAndReturnArgs} args - Arguments to update many Pages.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PageUpdateManyAndReturnArgs>(args: SelectSubset<T, PageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
     */
    upsert<T extends PageUpsertArgs>(args: SelectSubset<T, PageUpsertArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): Prisma.PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Page model
   */
  readonly fields: PageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    socialAccount<T extends SocialAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SocialAccountDefaultArgs<ExtArgs>>): Prisma__SocialAccountClient<$Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    postPages<T extends Page$postPagesArgs<ExtArgs> = {}>(args?: Subset<T, Page$postPagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Page model
   */
  interface PageFieldRefs {
    readonly id: FieldRef<"Page", 'String'>
    readonly socialAccountId: FieldRef<"Page", 'String'>
    readonly pageId: FieldRef<"Page", 'String'>
    readonly name: FieldRef<"Page", 'String'>
    readonly category: FieldRef<"Page", 'String'>
    readonly about: FieldRef<"Page", 'String'>
    readonly picture: FieldRef<"Page", 'String'>
    readonly accessToken: FieldRef<"Page", 'String'>
    readonly isActive: FieldRef<"Page", 'Boolean'>
    readonly createdAt: FieldRef<"Page", 'DateTime'>
    readonly updatedAt: FieldRef<"Page", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Page findUnique
   */
  export type PageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findFirst
   */
  export type PageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findMany
   */
  export type PageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Pages to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page create
   */
  export type PageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to create a Page.
     */
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }

  /**
   * Page createMany
   */
  export type PageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Page createManyAndReturn
   */
  export type PageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page update
   */
  export type PageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to update a Page.
     */
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
  }

  /**
   * Page updateManyAndReturn
   */
  export type PageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page upsert
   */
  export type PageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The filter to search for the Page to update in case it exists.
     */
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     */
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }

  /**
   * Page delete
   */
  export type PageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter which Page to delete.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pages to delete
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to delete.
     */
    limit?: number
  }

  /**
   * Page.postPages
   */
  export type Page$postPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    where?: PostPageWhereInput
    orderBy?: PostPageOrderByWithRelationInput | PostPageOrderByWithRelationInput[]
    cursor?: PostPageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostPageScalarFieldEnum | PostPageScalarFieldEnum[]
  }

  /**
   * Page without action
   */
  export type PageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    content: string | null
    mediaType: string | null
    status: $Enums.PostStatus | null
    scheduledAt: Date | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    content: string | null
    mediaType: string | null
    status: $Enums.PostStatus | null
    scheduledAt: Date | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    content: number
    mediaUrls: number
    mediaType: number
    status: number
    scheduledAt: number
    publishedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    mediaType?: true
    status?: true
    scheduledAt?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    mediaType?: true
    status?: true
    scheduledAt?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    mediaUrls?: true
    mediaType?: true
    status?: true
    scheduledAt?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    userId: string
    title: string | null
    content: string
    mediaUrls: string[]
    mediaType: string | null
    status: $Enums.PostStatus
    scheduledAt: Date | null
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    mediaUrls?: boolean
    mediaType?: boolean
    status?: boolean
    scheduledAt?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    postPages?: boolean | Post$postPagesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    mediaUrls?: boolean
    mediaType?: boolean
    status?: boolean
    scheduledAt?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    mediaUrls?: boolean
    mediaType?: boolean
    status?: boolean
    scheduledAt?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    mediaUrls?: boolean
    mediaType?: boolean
    status?: boolean
    scheduledAt?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "content" | "mediaUrls" | "mediaType" | "status" | "scheduledAt" | "publishedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    postPages?: boolean | Post$postPagesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      postPages: Prisma.$PostPagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string | null
      content: string
      mediaUrls: string[]
      mediaType: string | null
      status: $Enums.PostStatus
      scheduledAt: Date | null
      publishedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    postPages<T extends Post$postPagesArgs<ExtArgs> = {}>(args?: Subset<T, Post$postPagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly userId: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly mediaUrls: FieldRef<"Post", 'String[]'>
    readonly mediaType: FieldRef<"Post", 'String'>
    readonly status: FieldRef<"Post", 'PostStatus'>
    readonly scheduledAt: FieldRef<"Post", 'DateTime'>
    readonly publishedAt: FieldRef<"Post", 'DateTime'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.postPages
   */
  export type Post$postPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    where?: PostPageWhereInput
    orderBy?: PostPageOrderByWithRelationInput | PostPageOrderByWithRelationInput[]
    cursor?: PostPageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostPageScalarFieldEnum | PostPageScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model PostPage
   */

  export type AggregatePostPage = {
    _count: PostPageCountAggregateOutputType | null
    _min: PostPageMinAggregateOutputType | null
    _max: PostPageMaxAggregateOutputType | null
  }

  export type PostPageMinAggregateOutputType = {
    id: string | null
    postId: string | null
    pageId: string | null
    status: $Enums.PostPageStatus | null
    fbPostId: string | null
    errorMsg: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostPageMaxAggregateOutputType = {
    id: string | null
    postId: string | null
    pageId: string | null
    status: $Enums.PostPageStatus | null
    fbPostId: string | null
    errorMsg: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostPageCountAggregateOutputType = {
    id: number
    postId: number
    pageId: number
    status: number
    fbPostId: number
    errorMsg: number
    publishedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostPageMinAggregateInputType = {
    id?: true
    postId?: true
    pageId?: true
    status?: true
    fbPostId?: true
    errorMsg?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostPageMaxAggregateInputType = {
    id?: true
    postId?: true
    pageId?: true
    status?: true
    fbPostId?: true
    errorMsg?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostPageCountAggregateInputType = {
    id?: true
    postId?: true
    pageId?: true
    status?: true
    fbPostId?: true
    errorMsg?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostPageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostPage to aggregate.
     */
    where?: PostPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPages to fetch.
     */
    orderBy?: PostPageOrderByWithRelationInput | PostPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostPages
    **/
    _count?: true | PostPageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostPageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostPageMaxAggregateInputType
  }

  export type GetPostPageAggregateType<T extends PostPageAggregateArgs> = {
        [P in keyof T & keyof AggregatePostPage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostPage[P]>
      : GetScalarType<T[P], AggregatePostPage[P]>
  }




  export type PostPageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostPageWhereInput
    orderBy?: PostPageOrderByWithAggregationInput | PostPageOrderByWithAggregationInput[]
    by: PostPageScalarFieldEnum[] | PostPageScalarFieldEnum
    having?: PostPageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostPageCountAggregateInputType | true
    _min?: PostPageMinAggregateInputType
    _max?: PostPageMaxAggregateInputType
  }

  export type PostPageGroupByOutputType = {
    id: string
    postId: string
    pageId: string
    status: $Enums.PostPageStatus
    fbPostId: string | null
    errorMsg: string | null
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PostPageCountAggregateOutputType | null
    _min: PostPageMinAggregateOutputType | null
    _max: PostPageMaxAggregateOutputType | null
  }

  type GetPostPageGroupByPayload<T extends PostPageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostPageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostPageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostPageGroupByOutputType[P]>
            : GetScalarType<T[P], PostPageGroupByOutputType[P]>
        }
      >
    >


  export type PostPageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    pageId?: boolean
    status?: boolean
    fbPostId?: boolean
    errorMsg?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postPage"]>

  export type PostPageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    pageId?: boolean
    status?: boolean
    fbPostId?: boolean
    errorMsg?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postPage"]>

  export type PostPageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    pageId?: boolean
    status?: boolean
    fbPostId?: boolean
    errorMsg?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postPage"]>

  export type PostPageSelectScalar = {
    id?: boolean
    postId?: boolean
    pageId?: boolean
    status?: boolean
    fbPostId?: boolean
    errorMsg?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostPageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "pageId" | "status" | "fbPostId" | "errorMsg" | "publishedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["postPage"]>
  export type PostPageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    page?: boolean | PageDefaultArgs<ExtArgs>
  }
  export type PostPageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    page?: boolean | PageDefaultArgs<ExtArgs>
  }
  export type PostPageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    page?: boolean | PageDefaultArgs<ExtArgs>
  }

  export type $PostPagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostPage"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      page: Prisma.$PagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      postId: string
      pageId: string
      status: $Enums.PostPageStatus
      fbPostId: string | null
      errorMsg: string | null
      publishedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["postPage"]>
    composites: {}
  }

  type PostPageGetPayload<S extends boolean | null | undefined | PostPageDefaultArgs> = $Result.GetResult<Prisma.$PostPagePayload, S>

  type PostPageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostPageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostPageCountAggregateInputType | true
    }

  export interface PostPageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostPage'], meta: { name: 'PostPage' } }
    /**
     * Find zero or one PostPage that matches the filter.
     * @param {PostPageFindUniqueArgs} args - Arguments to find a PostPage
     * @example
     * // Get one PostPage
     * const postPage = await prisma.postPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostPageFindUniqueArgs>(args: SelectSubset<T, PostPageFindUniqueArgs<ExtArgs>>): Prisma__PostPageClient<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostPage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostPageFindUniqueOrThrowArgs} args - Arguments to find a PostPage
     * @example
     * // Get one PostPage
     * const postPage = await prisma.postPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostPageFindUniqueOrThrowArgs>(args: SelectSubset<T, PostPageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostPageClient<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPageFindFirstArgs} args - Arguments to find a PostPage
     * @example
     * // Get one PostPage
     * const postPage = await prisma.postPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostPageFindFirstArgs>(args?: SelectSubset<T, PostPageFindFirstArgs<ExtArgs>>): Prisma__PostPageClient<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPageFindFirstOrThrowArgs} args - Arguments to find a PostPage
     * @example
     * // Get one PostPage
     * const postPage = await prisma.postPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostPageFindFirstOrThrowArgs>(args?: SelectSubset<T, PostPageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostPageClient<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostPages
     * const postPages = await prisma.postPage.findMany()
     * 
     * // Get first 10 PostPages
     * const postPages = await prisma.postPage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postPageWithIdOnly = await prisma.postPage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostPageFindManyArgs>(args?: SelectSubset<T, PostPageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostPage.
     * @param {PostPageCreateArgs} args - Arguments to create a PostPage.
     * @example
     * // Create one PostPage
     * const PostPage = await prisma.postPage.create({
     *   data: {
     *     // ... data to create a PostPage
     *   }
     * })
     * 
     */
    create<T extends PostPageCreateArgs>(args: SelectSubset<T, PostPageCreateArgs<ExtArgs>>): Prisma__PostPageClient<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostPages.
     * @param {PostPageCreateManyArgs} args - Arguments to create many PostPages.
     * @example
     * // Create many PostPages
     * const postPage = await prisma.postPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostPageCreateManyArgs>(args?: SelectSubset<T, PostPageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostPages and returns the data saved in the database.
     * @param {PostPageCreateManyAndReturnArgs} args - Arguments to create many PostPages.
     * @example
     * // Create many PostPages
     * const postPage = await prisma.postPage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostPages and only return the `id`
     * const postPageWithIdOnly = await prisma.postPage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostPageCreateManyAndReturnArgs>(args?: SelectSubset<T, PostPageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostPage.
     * @param {PostPageDeleteArgs} args - Arguments to delete one PostPage.
     * @example
     * // Delete one PostPage
     * const PostPage = await prisma.postPage.delete({
     *   where: {
     *     // ... filter to delete one PostPage
     *   }
     * })
     * 
     */
    delete<T extends PostPageDeleteArgs>(args: SelectSubset<T, PostPageDeleteArgs<ExtArgs>>): Prisma__PostPageClient<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostPage.
     * @param {PostPageUpdateArgs} args - Arguments to update one PostPage.
     * @example
     * // Update one PostPage
     * const postPage = await prisma.postPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostPageUpdateArgs>(args: SelectSubset<T, PostPageUpdateArgs<ExtArgs>>): Prisma__PostPageClient<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostPages.
     * @param {PostPageDeleteManyArgs} args - Arguments to filter PostPages to delete.
     * @example
     * // Delete a few PostPages
     * const { count } = await prisma.postPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostPageDeleteManyArgs>(args?: SelectSubset<T, PostPageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostPages
     * const postPage = await prisma.postPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostPageUpdateManyArgs>(args: SelectSubset<T, PostPageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostPages and returns the data updated in the database.
     * @param {PostPageUpdateManyAndReturnArgs} args - Arguments to update many PostPages.
     * @example
     * // Update many PostPages
     * const postPage = await prisma.postPage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostPages and only return the `id`
     * const postPageWithIdOnly = await prisma.postPage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostPageUpdateManyAndReturnArgs>(args: SelectSubset<T, PostPageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostPage.
     * @param {PostPageUpsertArgs} args - Arguments to update or create a PostPage.
     * @example
     * // Update or create a PostPage
     * const postPage = await prisma.postPage.upsert({
     *   create: {
     *     // ... data to create a PostPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostPage we want to update
     *   }
     * })
     */
    upsert<T extends PostPageUpsertArgs>(args: SelectSubset<T, PostPageUpsertArgs<ExtArgs>>): Prisma__PostPageClient<$Result.GetResult<Prisma.$PostPagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPageCountArgs} args - Arguments to filter PostPages to count.
     * @example
     * // Count the number of PostPages
     * const count = await prisma.postPage.count({
     *   where: {
     *     // ... the filter for the PostPages we want to count
     *   }
     * })
    **/
    count<T extends PostPageCountArgs>(
      args?: Subset<T, PostPageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostPageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostPageAggregateArgs>(args: Subset<T, PostPageAggregateArgs>): Prisma.PrismaPromise<GetPostPageAggregateType<T>>

    /**
     * Group by PostPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostPageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostPageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostPageGroupByArgs['orderBy'] }
        : { orderBy?: PostPageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostPageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostPage model
   */
  readonly fields: PostPageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostPage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostPageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    page<T extends PageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PageDefaultArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostPage model
   */
  interface PostPageFieldRefs {
    readonly id: FieldRef<"PostPage", 'String'>
    readonly postId: FieldRef<"PostPage", 'String'>
    readonly pageId: FieldRef<"PostPage", 'String'>
    readonly status: FieldRef<"PostPage", 'PostPageStatus'>
    readonly fbPostId: FieldRef<"PostPage", 'String'>
    readonly errorMsg: FieldRef<"PostPage", 'String'>
    readonly publishedAt: FieldRef<"PostPage", 'DateTime'>
    readonly createdAt: FieldRef<"PostPage", 'DateTime'>
    readonly updatedAt: FieldRef<"PostPage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostPage findUnique
   */
  export type PostPageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    /**
     * Filter, which PostPage to fetch.
     */
    where: PostPageWhereUniqueInput
  }

  /**
   * PostPage findUniqueOrThrow
   */
  export type PostPageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    /**
     * Filter, which PostPage to fetch.
     */
    where: PostPageWhereUniqueInput
  }

  /**
   * PostPage findFirst
   */
  export type PostPageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    /**
     * Filter, which PostPage to fetch.
     */
    where?: PostPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPages to fetch.
     */
    orderBy?: PostPageOrderByWithRelationInput | PostPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostPages.
     */
    cursor?: PostPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostPages.
     */
    distinct?: PostPageScalarFieldEnum | PostPageScalarFieldEnum[]
  }

  /**
   * PostPage findFirstOrThrow
   */
  export type PostPageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    /**
     * Filter, which PostPage to fetch.
     */
    where?: PostPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPages to fetch.
     */
    orderBy?: PostPageOrderByWithRelationInput | PostPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostPages.
     */
    cursor?: PostPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostPages.
     */
    distinct?: PostPageScalarFieldEnum | PostPageScalarFieldEnum[]
  }

  /**
   * PostPage findMany
   */
  export type PostPageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    /**
     * Filter, which PostPages to fetch.
     */
    where?: PostPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostPages to fetch.
     */
    orderBy?: PostPageOrderByWithRelationInput | PostPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostPages.
     */
    cursor?: PostPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostPages.
     */
    skip?: number
    distinct?: PostPageScalarFieldEnum | PostPageScalarFieldEnum[]
  }

  /**
   * PostPage create
   */
  export type PostPageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    /**
     * The data needed to create a PostPage.
     */
    data: XOR<PostPageCreateInput, PostPageUncheckedCreateInput>
  }

  /**
   * PostPage createMany
   */
  export type PostPageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostPages.
     */
    data: PostPageCreateManyInput | PostPageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostPage createManyAndReturn
   */
  export type PostPageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * The data used to create many PostPages.
     */
    data: PostPageCreateManyInput | PostPageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostPage update
   */
  export type PostPageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    /**
     * The data needed to update a PostPage.
     */
    data: XOR<PostPageUpdateInput, PostPageUncheckedUpdateInput>
    /**
     * Choose, which PostPage to update.
     */
    where: PostPageWhereUniqueInput
  }

  /**
   * PostPage updateMany
   */
  export type PostPageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostPages.
     */
    data: XOR<PostPageUpdateManyMutationInput, PostPageUncheckedUpdateManyInput>
    /**
     * Filter which PostPages to update
     */
    where?: PostPageWhereInput
    /**
     * Limit how many PostPages to update.
     */
    limit?: number
  }

  /**
   * PostPage updateManyAndReturn
   */
  export type PostPageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * The data used to update PostPages.
     */
    data: XOR<PostPageUpdateManyMutationInput, PostPageUncheckedUpdateManyInput>
    /**
     * Filter which PostPages to update
     */
    where?: PostPageWhereInput
    /**
     * Limit how many PostPages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostPage upsert
   */
  export type PostPageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    /**
     * The filter to search for the PostPage to update in case it exists.
     */
    where: PostPageWhereUniqueInput
    /**
     * In case the PostPage found by the `where` argument doesn't exist, create a new PostPage with this data.
     */
    create: XOR<PostPageCreateInput, PostPageUncheckedCreateInput>
    /**
     * In case the PostPage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostPageUpdateInput, PostPageUncheckedUpdateInput>
  }

  /**
   * PostPage delete
   */
  export type PostPageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
    /**
     * Filter which PostPage to delete.
     */
    where: PostPageWhereUniqueInput
  }

  /**
   * PostPage deleteMany
   */
  export type PostPageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostPages to delete
     */
    where?: PostPageWhereInput
    /**
     * Limit how many PostPages to delete.
     */
    limit?: number
  }

  /**
   * PostPage without action
   */
  export type PostPageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostPage
     */
    select?: PostPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostPage
     */
    omit?: PostPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostPageInclude<ExtArgs> | null
  }


  /**
   * Model PostAnalytics
   */

  export type AggregatePostAnalytics = {
    _count: PostAnalyticsCountAggregateOutputType | null
    _avg: PostAnalyticsAvgAggregateOutputType | null
    _sum: PostAnalyticsSumAggregateOutputType | null
    _min: PostAnalyticsMinAggregateOutputType | null
    _max: PostAnalyticsMaxAggregateOutputType | null
  }

  export type PostAnalyticsAvgAggregateOutputType = {
    likes: number | null
    comments: number | null
    shares: number | null
    reach: number | null
    impressions: number | null
    clicks: number | null
  }

  export type PostAnalyticsSumAggregateOutputType = {
    likes: number | null
    comments: number | null
    shares: number | null
    reach: number | null
    impressions: number | null
    clicks: number | null
  }

  export type PostAnalyticsMinAggregateOutputType = {
    id: string | null
    fbPostId: string | null
    pageId: string | null
    likes: number | null
    comments: number | null
    shares: number | null
    reach: number | null
    impressions: number | null
    clicks: number | null
    lastSyncAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostAnalyticsMaxAggregateOutputType = {
    id: string | null
    fbPostId: string | null
    pageId: string | null
    likes: number | null
    comments: number | null
    shares: number | null
    reach: number | null
    impressions: number | null
    clicks: number | null
    lastSyncAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostAnalyticsCountAggregateOutputType = {
    id: number
    fbPostId: number
    pageId: number
    likes: number
    comments: number
    shares: number
    reach: number
    impressions: number
    clicks: number
    lastSyncAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostAnalyticsAvgAggregateInputType = {
    likes?: true
    comments?: true
    shares?: true
    reach?: true
    impressions?: true
    clicks?: true
  }

  export type PostAnalyticsSumAggregateInputType = {
    likes?: true
    comments?: true
    shares?: true
    reach?: true
    impressions?: true
    clicks?: true
  }

  export type PostAnalyticsMinAggregateInputType = {
    id?: true
    fbPostId?: true
    pageId?: true
    likes?: true
    comments?: true
    shares?: true
    reach?: true
    impressions?: true
    clicks?: true
    lastSyncAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostAnalyticsMaxAggregateInputType = {
    id?: true
    fbPostId?: true
    pageId?: true
    likes?: true
    comments?: true
    shares?: true
    reach?: true
    impressions?: true
    clicks?: true
    lastSyncAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostAnalyticsCountAggregateInputType = {
    id?: true
    fbPostId?: true
    pageId?: true
    likes?: true
    comments?: true
    shares?: true
    reach?: true
    impressions?: true
    clicks?: true
    lastSyncAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAnalyticsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostAnalytics to aggregate.
     */
    where?: PostAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostAnalytics to fetch.
     */
    orderBy?: PostAnalyticsOrderByWithRelationInput | PostAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostAnalytics
    **/
    _count?: true | PostAnalyticsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAnalyticsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostAnalyticsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostAnalyticsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostAnalyticsMaxAggregateInputType
  }

  export type GetPostAnalyticsAggregateType<T extends PostAnalyticsAggregateArgs> = {
        [P in keyof T & keyof AggregatePostAnalytics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostAnalytics[P]>
      : GetScalarType<T[P], AggregatePostAnalytics[P]>
  }




  export type PostAnalyticsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostAnalyticsWhereInput
    orderBy?: PostAnalyticsOrderByWithAggregationInput | PostAnalyticsOrderByWithAggregationInput[]
    by: PostAnalyticsScalarFieldEnum[] | PostAnalyticsScalarFieldEnum
    having?: PostAnalyticsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostAnalyticsCountAggregateInputType | true
    _avg?: PostAnalyticsAvgAggregateInputType
    _sum?: PostAnalyticsSumAggregateInputType
    _min?: PostAnalyticsMinAggregateInputType
    _max?: PostAnalyticsMaxAggregateInputType
  }

  export type PostAnalyticsGroupByOutputType = {
    id: string
    fbPostId: string
    pageId: string
    likes: number
    comments: number
    shares: number
    reach: number
    impressions: number
    clicks: number
    lastSyncAt: Date
    createdAt: Date
    updatedAt: Date
    _count: PostAnalyticsCountAggregateOutputType | null
    _avg: PostAnalyticsAvgAggregateOutputType | null
    _sum: PostAnalyticsSumAggregateOutputType | null
    _min: PostAnalyticsMinAggregateOutputType | null
    _max: PostAnalyticsMaxAggregateOutputType | null
  }

  type GetPostAnalyticsGroupByPayload<T extends PostAnalyticsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostAnalyticsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostAnalyticsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostAnalyticsGroupByOutputType[P]>
            : GetScalarType<T[P], PostAnalyticsGroupByOutputType[P]>
        }
      >
    >


  export type PostAnalyticsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fbPostId?: boolean
    pageId?: boolean
    likes?: boolean
    comments?: boolean
    shares?: boolean
    reach?: boolean
    impressions?: boolean
    clicks?: boolean
    lastSyncAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["postAnalytics"]>

  export type PostAnalyticsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fbPostId?: boolean
    pageId?: boolean
    likes?: boolean
    comments?: boolean
    shares?: boolean
    reach?: boolean
    impressions?: boolean
    clicks?: boolean
    lastSyncAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["postAnalytics"]>

  export type PostAnalyticsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fbPostId?: boolean
    pageId?: boolean
    likes?: boolean
    comments?: boolean
    shares?: boolean
    reach?: boolean
    impressions?: boolean
    clicks?: boolean
    lastSyncAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["postAnalytics"]>

  export type PostAnalyticsSelectScalar = {
    id?: boolean
    fbPostId?: boolean
    pageId?: boolean
    likes?: boolean
    comments?: boolean
    shares?: boolean
    reach?: boolean
    impressions?: boolean
    clicks?: boolean
    lastSyncAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostAnalyticsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fbPostId" | "pageId" | "likes" | "comments" | "shares" | "reach" | "impressions" | "clicks" | "lastSyncAt" | "createdAt" | "updatedAt", ExtArgs["result"]["postAnalytics"]>

  export type $PostAnalyticsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostAnalytics"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fbPostId: string
      pageId: string
      likes: number
      comments: number
      shares: number
      reach: number
      impressions: number
      clicks: number
      lastSyncAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["postAnalytics"]>
    composites: {}
  }

  type PostAnalyticsGetPayload<S extends boolean | null | undefined | PostAnalyticsDefaultArgs> = $Result.GetResult<Prisma.$PostAnalyticsPayload, S>

  type PostAnalyticsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostAnalyticsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostAnalyticsCountAggregateInputType | true
    }

  export interface PostAnalyticsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostAnalytics'], meta: { name: 'PostAnalytics' } }
    /**
     * Find zero or one PostAnalytics that matches the filter.
     * @param {PostAnalyticsFindUniqueArgs} args - Arguments to find a PostAnalytics
     * @example
     * // Get one PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostAnalyticsFindUniqueArgs>(args: SelectSubset<T, PostAnalyticsFindUniqueArgs<ExtArgs>>): Prisma__PostAnalyticsClient<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostAnalytics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostAnalyticsFindUniqueOrThrowArgs} args - Arguments to find a PostAnalytics
     * @example
     * // Get one PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostAnalyticsFindUniqueOrThrowArgs>(args: SelectSubset<T, PostAnalyticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostAnalyticsClient<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAnalyticsFindFirstArgs} args - Arguments to find a PostAnalytics
     * @example
     * // Get one PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostAnalyticsFindFirstArgs>(args?: SelectSubset<T, PostAnalyticsFindFirstArgs<ExtArgs>>): Prisma__PostAnalyticsClient<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostAnalytics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAnalyticsFindFirstOrThrowArgs} args - Arguments to find a PostAnalytics
     * @example
     * // Get one PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostAnalyticsFindFirstOrThrowArgs>(args?: SelectSubset<T, PostAnalyticsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostAnalyticsClient<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAnalyticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.findMany()
     * 
     * // Get first 10 PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postAnalyticsWithIdOnly = await prisma.postAnalytics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostAnalyticsFindManyArgs>(args?: SelectSubset<T, PostAnalyticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostAnalytics.
     * @param {PostAnalyticsCreateArgs} args - Arguments to create a PostAnalytics.
     * @example
     * // Create one PostAnalytics
     * const PostAnalytics = await prisma.postAnalytics.create({
     *   data: {
     *     // ... data to create a PostAnalytics
     *   }
     * })
     * 
     */
    create<T extends PostAnalyticsCreateArgs>(args: SelectSubset<T, PostAnalyticsCreateArgs<ExtArgs>>): Prisma__PostAnalyticsClient<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostAnalytics.
     * @param {PostAnalyticsCreateManyArgs} args - Arguments to create many PostAnalytics.
     * @example
     * // Create many PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostAnalyticsCreateManyArgs>(args?: SelectSubset<T, PostAnalyticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostAnalytics and returns the data saved in the database.
     * @param {PostAnalyticsCreateManyAndReturnArgs} args - Arguments to create many PostAnalytics.
     * @example
     * // Create many PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostAnalytics and only return the `id`
     * const postAnalyticsWithIdOnly = await prisma.postAnalytics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostAnalyticsCreateManyAndReturnArgs>(args?: SelectSubset<T, PostAnalyticsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostAnalytics.
     * @param {PostAnalyticsDeleteArgs} args - Arguments to delete one PostAnalytics.
     * @example
     * // Delete one PostAnalytics
     * const PostAnalytics = await prisma.postAnalytics.delete({
     *   where: {
     *     // ... filter to delete one PostAnalytics
     *   }
     * })
     * 
     */
    delete<T extends PostAnalyticsDeleteArgs>(args: SelectSubset<T, PostAnalyticsDeleteArgs<ExtArgs>>): Prisma__PostAnalyticsClient<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostAnalytics.
     * @param {PostAnalyticsUpdateArgs} args - Arguments to update one PostAnalytics.
     * @example
     * // Update one PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostAnalyticsUpdateArgs>(args: SelectSubset<T, PostAnalyticsUpdateArgs<ExtArgs>>): Prisma__PostAnalyticsClient<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostAnalytics.
     * @param {PostAnalyticsDeleteManyArgs} args - Arguments to filter PostAnalytics to delete.
     * @example
     * // Delete a few PostAnalytics
     * const { count } = await prisma.postAnalytics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostAnalyticsDeleteManyArgs>(args?: SelectSubset<T, PostAnalyticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAnalyticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostAnalyticsUpdateManyArgs>(args: SelectSubset<T, PostAnalyticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostAnalytics and returns the data updated in the database.
     * @param {PostAnalyticsUpdateManyAndReturnArgs} args - Arguments to update many PostAnalytics.
     * @example
     * // Update many PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostAnalytics and only return the `id`
     * const postAnalyticsWithIdOnly = await prisma.postAnalytics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostAnalyticsUpdateManyAndReturnArgs>(args: SelectSubset<T, PostAnalyticsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostAnalytics.
     * @param {PostAnalyticsUpsertArgs} args - Arguments to update or create a PostAnalytics.
     * @example
     * // Update or create a PostAnalytics
     * const postAnalytics = await prisma.postAnalytics.upsert({
     *   create: {
     *     // ... data to create a PostAnalytics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostAnalytics we want to update
     *   }
     * })
     */
    upsert<T extends PostAnalyticsUpsertArgs>(args: SelectSubset<T, PostAnalyticsUpsertArgs<ExtArgs>>): Prisma__PostAnalyticsClient<$Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAnalyticsCountArgs} args - Arguments to filter PostAnalytics to count.
     * @example
     * // Count the number of PostAnalytics
     * const count = await prisma.postAnalytics.count({
     *   where: {
     *     // ... the filter for the PostAnalytics we want to count
     *   }
     * })
    **/
    count<T extends PostAnalyticsCountArgs>(
      args?: Subset<T, PostAnalyticsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostAnalyticsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAnalyticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAnalyticsAggregateArgs>(args: Subset<T, PostAnalyticsAggregateArgs>): Prisma.PrismaPromise<GetPostAnalyticsAggregateType<T>>

    /**
     * Group by PostAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAnalyticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostAnalyticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostAnalyticsGroupByArgs['orderBy'] }
        : { orderBy?: PostAnalyticsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostAnalyticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostAnalyticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostAnalytics model
   */
  readonly fields: PostAnalyticsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostAnalytics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostAnalyticsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostAnalytics model
   */
  interface PostAnalyticsFieldRefs {
    readonly id: FieldRef<"PostAnalytics", 'String'>
    readonly fbPostId: FieldRef<"PostAnalytics", 'String'>
    readonly pageId: FieldRef<"PostAnalytics", 'String'>
    readonly likes: FieldRef<"PostAnalytics", 'Int'>
    readonly comments: FieldRef<"PostAnalytics", 'Int'>
    readonly shares: FieldRef<"PostAnalytics", 'Int'>
    readonly reach: FieldRef<"PostAnalytics", 'Int'>
    readonly impressions: FieldRef<"PostAnalytics", 'Int'>
    readonly clicks: FieldRef<"PostAnalytics", 'Int'>
    readonly lastSyncAt: FieldRef<"PostAnalytics", 'DateTime'>
    readonly createdAt: FieldRef<"PostAnalytics", 'DateTime'>
    readonly updatedAt: FieldRef<"PostAnalytics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostAnalytics findUnique
   */
  export type PostAnalyticsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which PostAnalytics to fetch.
     */
    where: PostAnalyticsWhereUniqueInput
  }

  /**
   * PostAnalytics findUniqueOrThrow
   */
  export type PostAnalyticsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which PostAnalytics to fetch.
     */
    where: PostAnalyticsWhereUniqueInput
  }

  /**
   * PostAnalytics findFirst
   */
  export type PostAnalyticsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which PostAnalytics to fetch.
     */
    where?: PostAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostAnalytics to fetch.
     */
    orderBy?: PostAnalyticsOrderByWithRelationInput | PostAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostAnalytics.
     */
    cursor?: PostAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostAnalytics.
     */
    distinct?: PostAnalyticsScalarFieldEnum | PostAnalyticsScalarFieldEnum[]
  }

  /**
   * PostAnalytics findFirstOrThrow
   */
  export type PostAnalyticsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which PostAnalytics to fetch.
     */
    where?: PostAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostAnalytics to fetch.
     */
    orderBy?: PostAnalyticsOrderByWithRelationInput | PostAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostAnalytics.
     */
    cursor?: PostAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostAnalytics.
     */
    distinct?: PostAnalyticsScalarFieldEnum | PostAnalyticsScalarFieldEnum[]
  }

  /**
   * PostAnalytics findMany
   */
  export type PostAnalyticsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * Filter, which PostAnalytics to fetch.
     */
    where?: PostAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostAnalytics to fetch.
     */
    orderBy?: PostAnalyticsOrderByWithRelationInput | PostAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostAnalytics.
     */
    cursor?: PostAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostAnalytics.
     */
    skip?: number
    distinct?: PostAnalyticsScalarFieldEnum | PostAnalyticsScalarFieldEnum[]
  }

  /**
   * PostAnalytics create
   */
  export type PostAnalyticsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * The data needed to create a PostAnalytics.
     */
    data: XOR<PostAnalyticsCreateInput, PostAnalyticsUncheckedCreateInput>
  }

  /**
   * PostAnalytics createMany
   */
  export type PostAnalyticsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostAnalytics.
     */
    data: PostAnalyticsCreateManyInput | PostAnalyticsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostAnalytics createManyAndReturn
   */
  export type PostAnalyticsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * The data used to create many PostAnalytics.
     */
    data: PostAnalyticsCreateManyInput | PostAnalyticsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostAnalytics update
   */
  export type PostAnalyticsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * The data needed to update a PostAnalytics.
     */
    data: XOR<PostAnalyticsUpdateInput, PostAnalyticsUncheckedUpdateInput>
    /**
     * Choose, which PostAnalytics to update.
     */
    where: PostAnalyticsWhereUniqueInput
  }

  /**
   * PostAnalytics updateMany
   */
  export type PostAnalyticsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostAnalytics.
     */
    data: XOR<PostAnalyticsUpdateManyMutationInput, PostAnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which PostAnalytics to update
     */
    where?: PostAnalyticsWhereInput
    /**
     * Limit how many PostAnalytics to update.
     */
    limit?: number
  }

  /**
   * PostAnalytics updateManyAndReturn
   */
  export type PostAnalyticsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * The data used to update PostAnalytics.
     */
    data: XOR<PostAnalyticsUpdateManyMutationInput, PostAnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which PostAnalytics to update
     */
    where?: PostAnalyticsWhereInput
    /**
     * Limit how many PostAnalytics to update.
     */
    limit?: number
  }

  /**
   * PostAnalytics upsert
   */
  export type PostAnalyticsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * The filter to search for the PostAnalytics to update in case it exists.
     */
    where: PostAnalyticsWhereUniqueInput
    /**
     * In case the PostAnalytics found by the `where` argument doesn't exist, create a new PostAnalytics with this data.
     */
    create: XOR<PostAnalyticsCreateInput, PostAnalyticsUncheckedCreateInput>
    /**
     * In case the PostAnalytics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostAnalyticsUpdateInput, PostAnalyticsUncheckedUpdateInput>
  }

  /**
   * PostAnalytics delete
   */
  export type PostAnalyticsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
    /**
     * Filter which PostAnalytics to delete.
     */
    where: PostAnalyticsWhereUniqueInput
  }

  /**
   * PostAnalytics deleteMany
   */
  export type PostAnalyticsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostAnalytics to delete
     */
    where?: PostAnalyticsWhereInput
    /**
     * Limit how many PostAnalytics to delete.
     */
    limit?: number
  }

  /**
   * PostAnalytics without action
   */
  export type PostAnalyticsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostAnalytics
     */
    select?: PostAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostAnalytics
     */
    omit?: PostAnalyticsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    clerkId: 'clerkId',
    email: 'email',
    name: 'name',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SocialAccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    platform: 'platform',
    accountId: 'accountId',
    accountName: 'accountName',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresAt: 'expiresAt',
    scope: 'scope',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SocialAccountScalarFieldEnum = (typeof SocialAccountScalarFieldEnum)[keyof typeof SocialAccountScalarFieldEnum]


  export const PageScalarFieldEnum: {
    id: 'id',
    socialAccountId: 'socialAccountId',
    pageId: 'pageId',
    name: 'name',
    category: 'category',
    about: 'about',
    picture: 'picture',
    accessToken: 'accessToken',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    content: 'content',
    mediaUrls: 'mediaUrls',
    mediaType: 'mediaType',
    status: 'status',
    scheduledAt: 'scheduledAt',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const PostPageScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    pageId: 'pageId',
    status: 'status',
    fbPostId: 'fbPostId',
    errorMsg: 'errorMsg',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostPageScalarFieldEnum = (typeof PostPageScalarFieldEnum)[keyof typeof PostPageScalarFieldEnum]


  export const PostAnalyticsScalarFieldEnum: {
    id: 'id',
    fbPostId: 'fbPostId',
    pageId: 'pageId',
    likes: 'likes',
    comments: 'comments',
    shares: 'shares',
    reach: 'reach',
    impressions: 'impressions',
    clicks: 'clicks',
    lastSyncAt: 'lastSyncAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostAnalyticsScalarFieldEnum = (typeof PostAnalyticsScalarFieldEnum)[keyof typeof PostAnalyticsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PostStatus'
   */
  export type EnumPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostStatus'>
    


  /**
   * Reference to a field of type 'PostStatus[]'
   */
  export type ListEnumPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostStatus[]'>
    


  /**
   * Reference to a field of type 'PostPageStatus'
   */
  export type EnumPostPageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostPageStatus'>
    


  /**
   * Reference to a field of type 'PostPageStatus[]'
   */
  export type ListEnumPostPageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostPageStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    clerkId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    socialAccounts?: SocialAccountListRelationFilter
    posts?: PostListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    socialAccounts?: SocialAccountOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerkId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    socialAccounts?: SocialAccountListRelationFilter
    posts?: PostListRelationFilter
  }, "id" | "clerkId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    clerkId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SocialAccountWhereInput = {
    AND?: SocialAccountWhereInput | SocialAccountWhereInput[]
    OR?: SocialAccountWhereInput[]
    NOT?: SocialAccountWhereInput | SocialAccountWhereInput[]
    id?: StringFilter<"SocialAccount"> | string
    userId?: StringFilter<"SocialAccount"> | string
    platform?: StringFilter<"SocialAccount"> | string
    accountId?: StringFilter<"SocialAccount"> | string
    accountName?: StringNullableFilter<"SocialAccount"> | string | null
    accessToken?: StringFilter<"SocialAccount"> | string
    refreshToken?: StringNullableFilter<"SocialAccount"> | string | null
    expiresAt?: DateTimeNullableFilter<"SocialAccount"> | Date | string | null
    scope?: StringNullableFilter<"SocialAccount"> | string | null
    isActive?: BoolFilter<"SocialAccount"> | boolean
    createdAt?: DateTimeFilter<"SocialAccount"> | Date | string
    updatedAt?: DateTimeFilter<"SocialAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pages?: PageListRelationFilter
  }

  export type SocialAccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    accountId?: SortOrder
    accountName?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    pages?: PageOrderByRelationAggregateInput
  }

  export type SocialAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_platform_accountId?: SocialAccountUserIdPlatformAccountIdCompoundUniqueInput
    AND?: SocialAccountWhereInput | SocialAccountWhereInput[]
    OR?: SocialAccountWhereInput[]
    NOT?: SocialAccountWhereInput | SocialAccountWhereInput[]
    userId?: StringFilter<"SocialAccount"> | string
    platform?: StringFilter<"SocialAccount"> | string
    accountId?: StringFilter<"SocialAccount"> | string
    accountName?: StringNullableFilter<"SocialAccount"> | string | null
    accessToken?: StringFilter<"SocialAccount"> | string
    refreshToken?: StringNullableFilter<"SocialAccount"> | string | null
    expiresAt?: DateTimeNullableFilter<"SocialAccount"> | Date | string | null
    scope?: StringNullableFilter<"SocialAccount"> | string | null
    isActive?: BoolFilter<"SocialAccount"> | boolean
    createdAt?: DateTimeFilter<"SocialAccount"> | Date | string
    updatedAt?: DateTimeFilter<"SocialAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pages?: PageListRelationFilter
  }, "id" | "userId_platform_accountId">

  export type SocialAccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    accountId?: SortOrder
    accountName?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SocialAccountCountOrderByAggregateInput
    _max?: SocialAccountMaxOrderByAggregateInput
    _min?: SocialAccountMinOrderByAggregateInput
  }

  export type SocialAccountScalarWhereWithAggregatesInput = {
    AND?: SocialAccountScalarWhereWithAggregatesInput | SocialAccountScalarWhereWithAggregatesInput[]
    OR?: SocialAccountScalarWhereWithAggregatesInput[]
    NOT?: SocialAccountScalarWhereWithAggregatesInput | SocialAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SocialAccount"> | string
    userId?: StringWithAggregatesFilter<"SocialAccount"> | string
    platform?: StringWithAggregatesFilter<"SocialAccount"> | string
    accountId?: StringWithAggregatesFilter<"SocialAccount"> | string
    accountName?: StringNullableWithAggregatesFilter<"SocialAccount"> | string | null
    accessToken?: StringWithAggregatesFilter<"SocialAccount"> | string
    refreshToken?: StringNullableWithAggregatesFilter<"SocialAccount"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"SocialAccount"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"SocialAccount"> | string | null
    isActive?: BoolWithAggregatesFilter<"SocialAccount"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SocialAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SocialAccount"> | Date | string
  }

  export type PageWhereInput = {
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    id?: StringFilter<"Page"> | string
    socialAccountId?: StringFilter<"Page"> | string
    pageId?: StringFilter<"Page"> | string
    name?: StringFilter<"Page"> | string
    category?: StringNullableFilter<"Page"> | string | null
    about?: StringNullableFilter<"Page"> | string | null
    picture?: StringNullableFilter<"Page"> | string | null
    accessToken?: StringFilter<"Page"> | string
    isActive?: BoolFilter<"Page"> | boolean
    createdAt?: DateTimeFilter<"Page"> | Date | string
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    socialAccount?: XOR<SocialAccountScalarRelationFilter, SocialAccountWhereInput>
    postPages?: PostPageListRelationFilter
  }

  export type PageOrderByWithRelationInput = {
    id?: SortOrder
    socialAccountId?: SortOrder
    pageId?: SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    about?: SortOrderInput | SortOrder
    picture?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    socialAccount?: SocialAccountOrderByWithRelationInput
    postPages?: PostPageOrderByRelationAggregateInput
  }

  export type PageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    socialAccountId_pageId?: PageSocialAccountIdPageIdCompoundUniqueInput
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    socialAccountId?: StringFilter<"Page"> | string
    pageId?: StringFilter<"Page"> | string
    name?: StringFilter<"Page"> | string
    category?: StringNullableFilter<"Page"> | string | null
    about?: StringNullableFilter<"Page"> | string | null
    picture?: StringNullableFilter<"Page"> | string | null
    accessToken?: StringFilter<"Page"> | string
    isActive?: BoolFilter<"Page"> | boolean
    createdAt?: DateTimeFilter<"Page"> | Date | string
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    socialAccount?: XOR<SocialAccountScalarRelationFilter, SocialAccountWhereInput>
    postPages?: PostPageListRelationFilter
  }, "id" | "socialAccountId_pageId">

  export type PageOrderByWithAggregationInput = {
    id?: SortOrder
    socialAccountId?: SortOrder
    pageId?: SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    about?: SortOrderInput | SortOrder
    picture?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PageCountOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    OR?: PageScalarWhereWithAggregatesInput[]
    NOT?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Page"> | string
    socialAccountId?: StringWithAggregatesFilter<"Page"> | string
    pageId?: StringWithAggregatesFilter<"Page"> | string
    name?: StringWithAggregatesFilter<"Page"> | string
    category?: StringNullableWithAggregatesFilter<"Page"> | string | null
    about?: StringNullableWithAggregatesFilter<"Page"> | string | null
    picture?: StringNullableWithAggregatesFilter<"Page"> | string | null
    accessToken?: StringWithAggregatesFilter<"Page"> | string
    isActive?: BoolWithAggregatesFilter<"Page"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    userId?: StringFilter<"Post"> | string
    title?: StringNullableFilter<"Post"> | string | null
    content?: StringFilter<"Post"> | string
    mediaUrls?: StringNullableListFilter<"Post">
    mediaType?: StringNullableFilter<"Post"> | string | null
    status?: EnumPostStatusFilter<"Post"> | $Enums.PostStatus
    scheduledAt?: DateTimeNullableFilter<"Post"> | Date | string | null
    publishedAt?: DateTimeNullableFilter<"Post"> | Date | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    postPages?: PostPageListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    mediaType?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    postPages?: PostPageOrderByRelationAggregateInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    userId?: StringFilter<"Post"> | string
    title?: StringNullableFilter<"Post"> | string | null
    content?: StringFilter<"Post"> | string
    mediaUrls?: StringNullableListFilter<"Post">
    mediaType?: StringNullableFilter<"Post"> | string | null
    status?: EnumPostStatusFilter<"Post"> | $Enums.PostStatus
    scheduledAt?: DateTimeNullableFilter<"Post"> | Date | string | null
    publishedAt?: DateTimeNullableFilter<"Post"> | Date | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    postPages?: PostPageListRelationFilter
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    mediaType?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    userId?: StringWithAggregatesFilter<"Post"> | string
    title?: StringNullableWithAggregatesFilter<"Post"> | string | null
    content?: StringWithAggregatesFilter<"Post"> | string
    mediaUrls?: StringNullableListFilter<"Post">
    mediaType?: StringNullableWithAggregatesFilter<"Post"> | string | null
    status?: EnumPostStatusWithAggregatesFilter<"Post"> | $Enums.PostStatus
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"Post"> | Date | string | null
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Post"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
  }

  export type PostPageWhereInput = {
    AND?: PostPageWhereInput | PostPageWhereInput[]
    OR?: PostPageWhereInput[]
    NOT?: PostPageWhereInput | PostPageWhereInput[]
    id?: StringFilter<"PostPage"> | string
    postId?: StringFilter<"PostPage"> | string
    pageId?: StringFilter<"PostPage"> | string
    status?: EnumPostPageStatusFilter<"PostPage"> | $Enums.PostPageStatus
    fbPostId?: StringNullableFilter<"PostPage"> | string | null
    errorMsg?: StringNullableFilter<"PostPage"> | string | null
    publishedAt?: DateTimeNullableFilter<"PostPage"> | Date | string | null
    createdAt?: DateTimeFilter<"PostPage"> | Date | string
    updatedAt?: DateTimeFilter<"PostPage"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    page?: XOR<PageScalarRelationFilter, PageWhereInput>
  }

  export type PostPageOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    pageId?: SortOrder
    status?: SortOrder
    fbPostId?: SortOrderInput | SortOrder
    errorMsg?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    post?: PostOrderByWithRelationInput
    page?: PageOrderByWithRelationInput
  }

  export type PostPageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    postId_pageId?: PostPagePostIdPageIdCompoundUniqueInput
    AND?: PostPageWhereInput | PostPageWhereInput[]
    OR?: PostPageWhereInput[]
    NOT?: PostPageWhereInput | PostPageWhereInput[]
    postId?: StringFilter<"PostPage"> | string
    pageId?: StringFilter<"PostPage"> | string
    status?: EnumPostPageStatusFilter<"PostPage"> | $Enums.PostPageStatus
    fbPostId?: StringNullableFilter<"PostPage"> | string | null
    errorMsg?: StringNullableFilter<"PostPage"> | string | null
    publishedAt?: DateTimeNullableFilter<"PostPage"> | Date | string | null
    createdAt?: DateTimeFilter<"PostPage"> | Date | string
    updatedAt?: DateTimeFilter<"PostPage"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    page?: XOR<PageScalarRelationFilter, PageWhereInput>
  }, "id" | "postId_pageId">

  export type PostPageOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    pageId?: SortOrder
    status?: SortOrder
    fbPostId?: SortOrderInput | SortOrder
    errorMsg?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostPageCountOrderByAggregateInput
    _max?: PostPageMaxOrderByAggregateInput
    _min?: PostPageMinOrderByAggregateInput
  }

  export type PostPageScalarWhereWithAggregatesInput = {
    AND?: PostPageScalarWhereWithAggregatesInput | PostPageScalarWhereWithAggregatesInput[]
    OR?: PostPageScalarWhereWithAggregatesInput[]
    NOT?: PostPageScalarWhereWithAggregatesInput | PostPageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PostPage"> | string
    postId?: StringWithAggregatesFilter<"PostPage"> | string
    pageId?: StringWithAggregatesFilter<"PostPage"> | string
    status?: EnumPostPageStatusWithAggregatesFilter<"PostPage"> | $Enums.PostPageStatus
    fbPostId?: StringNullableWithAggregatesFilter<"PostPage"> | string | null
    errorMsg?: StringNullableWithAggregatesFilter<"PostPage"> | string | null
    publishedAt?: DateTimeNullableWithAggregatesFilter<"PostPage"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PostPage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PostPage"> | Date | string
  }

  export type PostAnalyticsWhereInput = {
    AND?: PostAnalyticsWhereInput | PostAnalyticsWhereInput[]
    OR?: PostAnalyticsWhereInput[]
    NOT?: PostAnalyticsWhereInput | PostAnalyticsWhereInput[]
    id?: StringFilter<"PostAnalytics"> | string
    fbPostId?: StringFilter<"PostAnalytics"> | string
    pageId?: StringFilter<"PostAnalytics"> | string
    likes?: IntFilter<"PostAnalytics"> | number
    comments?: IntFilter<"PostAnalytics"> | number
    shares?: IntFilter<"PostAnalytics"> | number
    reach?: IntFilter<"PostAnalytics"> | number
    impressions?: IntFilter<"PostAnalytics"> | number
    clicks?: IntFilter<"PostAnalytics"> | number
    lastSyncAt?: DateTimeFilter<"PostAnalytics"> | Date | string
    createdAt?: DateTimeFilter<"PostAnalytics"> | Date | string
    updatedAt?: DateTimeFilter<"PostAnalytics"> | Date | string
  }

  export type PostAnalyticsOrderByWithRelationInput = {
    id?: SortOrder
    fbPostId?: SortOrder
    pageId?: SortOrder
    likes?: SortOrder
    comments?: SortOrder
    shares?: SortOrder
    reach?: SortOrder
    impressions?: SortOrder
    clicks?: SortOrder
    lastSyncAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostAnalyticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fbPostId?: string
    AND?: PostAnalyticsWhereInput | PostAnalyticsWhereInput[]
    OR?: PostAnalyticsWhereInput[]
    NOT?: PostAnalyticsWhereInput | PostAnalyticsWhereInput[]
    pageId?: StringFilter<"PostAnalytics"> | string
    likes?: IntFilter<"PostAnalytics"> | number
    comments?: IntFilter<"PostAnalytics"> | number
    shares?: IntFilter<"PostAnalytics"> | number
    reach?: IntFilter<"PostAnalytics"> | number
    impressions?: IntFilter<"PostAnalytics"> | number
    clicks?: IntFilter<"PostAnalytics"> | number
    lastSyncAt?: DateTimeFilter<"PostAnalytics"> | Date | string
    createdAt?: DateTimeFilter<"PostAnalytics"> | Date | string
    updatedAt?: DateTimeFilter<"PostAnalytics"> | Date | string
  }, "id" | "fbPostId">

  export type PostAnalyticsOrderByWithAggregationInput = {
    id?: SortOrder
    fbPostId?: SortOrder
    pageId?: SortOrder
    likes?: SortOrder
    comments?: SortOrder
    shares?: SortOrder
    reach?: SortOrder
    impressions?: SortOrder
    clicks?: SortOrder
    lastSyncAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostAnalyticsCountOrderByAggregateInput
    _avg?: PostAnalyticsAvgOrderByAggregateInput
    _max?: PostAnalyticsMaxOrderByAggregateInput
    _min?: PostAnalyticsMinOrderByAggregateInput
    _sum?: PostAnalyticsSumOrderByAggregateInput
  }

  export type PostAnalyticsScalarWhereWithAggregatesInput = {
    AND?: PostAnalyticsScalarWhereWithAggregatesInput | PostAnalyticsScalarWhereWithAggregatesInput[]
    OR?: PostAnalyticsScalarWhereWithAggregatesInput[]
    NOT?: PostAnalyticsScalarWhereWithAggregatesInput | PostAnalyticsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PostAnalytics"> | string
    fbPostId?: StringWithAggregatesFilter<"PostAnalytics"> | string
    pageId?: StringWithAggregatesFilter<"PostAnalytics"> | string
    likes?: IntWithAggregatesFilter<"PostAnalytics"> | number
    comments?: IntWithAggregatesFilter<"PostAnalytics"> | number
    shares?: IntWithAggregatesFilter<"PostAnalytics"> | number
    reach?: IntWithAggregatesFilter<"PostAnalytics"> | number
    impressions?: IntWithAggregatesFilter<"PostAnalytics"> | number
    clicks?: IntWithAggregatesFilter<"PostAnalytics"> | number
    lastSyncAt?: DateTimeWithAggregatesFilter<"PostAnalytics"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PostAnalytics"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PostAnalytics"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    socialAccounts?: SocialAccountCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    socialAccounts?: SocialAccountUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialAccounts?: SocialAccountUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialAccounts?: SocialAccountUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialAccountCreateInput = {
    id?: string
    platform: string
    accountId: string
    accountName?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    scope?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSocialAccountsInput
    pages?: PageCreateNestedManyWithoutSocialAccountInput
  }

  export type SocialAccountUncheckedCreateInput = {
    id?: string
    userId: string
    platform: string
    accountId: string
    accountName?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    scope?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutSocialAccountInput
  }

  export type SocialAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSocialAccountsNestedInput
    pages?: PageUpdateManyWithoutSocialAccountNestedInput
  }

  export type SocialAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutSocialAccountNestedInput
  }

  export type SocialAccountCreateManyInput = {
    id?: string
    userId: string
    platform: string
    accountId: string
    accountName?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    scope?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SocialAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateInput = {
    id?: string
    pageId: string
    name: string
    category?: string | null
    about?: string | null
    picture?: string | null
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socialAccount: SocialAccountCreateNestedOneWithoutPagesInput
    postPages?: PostPageCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateInput = {
    id?: string
    socialAccountId: string
    pageId: string
    name: string
    category?: string | null
    about?: string | null
    picture?: string | null
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    postPages?: PostPageUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialAccount?: SocialAccountUpdateOneRequiredWithoutPagesNestedInput
    postPages?: PostPageUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    socialAccountId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postPages?: PostPageUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageCreateManyInput = {
    id?: string
    socialAccountId: string
    pageId: string
    name: string
    category?: string | null
    about?: string | null
    picture?: string | null
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    socialAccountId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    id?: string
    title?: string | null
    content: string
    mediaUrls?: PostCreatemediaUrlsInput | string[]
    mediaType?: string | null
    status?: $Enums.PostStatus
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPostsInput
    postPages?: PostPageCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    userId: string
    title?: string | null
    content: string
    mediaUrls?: PostCreatemediaUrlsInput | string[]
    mediaType?: string | null
    status?: $Enums.PostStatus
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postPages?: PostPageUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: PostUpdatemediaUrlsInput | string[]
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
    postPages?: PostPageUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: PostUpdatemediaUrlsInput | string[]
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postPages?: PostPageUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: string
    userId: string
    title?: string | null
    content: string
    mediaUrls?: PostCreatemediaUrlsInput | string[]
    mediaType?: string | null
    status?: $Enums.PostStatus
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: PostUpdatemediaUrlsInput | string[]
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: PostUpdatemediaUrlsInput | string[]
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPageCreateInput = {
    id?: string
    status?: $Enums.PostPageStatus
    fbPostId?: string | null
    errorMsg?: string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    post: PostCreateNestedOneWithoutPostPagesInput
    page: PageCreateNestedOneWithoutPostPagesInput
  }

  export type PostPageUncheckedCreateInput = {
    id?: string
    postId: string
    pageId: string
    status?: $Enums.PostPageStatus
    fbPostId?: string | null
    errorMsg?: string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostPageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutPostPagesNestedInput
    page?: PageUpdateOneRequiredWithoutPostPagesNestedInput
  }

  export type PostPageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPageCreateManyInput = {
    id?: string
    postId: string
    pageId: string
    status?: $Enums.PostPageStatus
    fbPostId?: string | null
    errorMsg?: string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostPageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostAnalyticsCreateInput = {
    id?: string
    fbPostId: string
    pageId: string
    likes?: number
    comments?: number
    shares?: number
    reach?: number
    impressions?: number
    clicks?: number
    lastSyncAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostAnalyticsUncheckedCreateInput = {
    id?: string
    fbPostId: string
    pageId: string
    likes?: number
    comments?: number
    shares?: number
    reach?: number
    impressions?: number
    clicks?: number
    lastSyncAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostAnalyticsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fbPostId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: IntFieldUpdateOperationsInput | number
    shares?: IntFieldUpdateOperationsInput | number
    reach?: IntFieldUpdateOperationsInput | number
    impressions?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostAnalyticsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fbPostId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: IntFieldUpdateOperationsInput | number
    shares?: IntFieldUpdateOperationsInput | number
    reach?: IntFieldUpdateOperationsInput | number
    impressions?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostAnalyticsCreateManyInput = {
    id?: string
    fbPostId: string
    pageId: string
    likes?: number
    comments?: number
    shares?: number
    reach?: number
    impressions?: number
    clicks?: number
    lastSyncAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostAnalyticsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fbPostId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: IntFieldUpdateOperationsInput | number
    shares?: IntFieldUpdateOperationsInput | number
    reach?: IntFieldUpdateOperationsInput | number
    impressions?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostAnalyticsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fbPostId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    likes?: IntFieldUpdateOperationsInput | number
    comments?: IntFieldUpdateOperationsInput | number
    shares?: IntFieldUpdateOperationsInput | number
    reach?: IntFieldUpdateOperationsInput | number
    impressions?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SocialAccountListRelationFilter = {
    every?: SocialAccountWhereInput
    some?: SocialAccountWhereInput
    none?: SocialAccountWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SocialAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PageListRelationFilter = {
    every?: PageWhereInput
    some?: PageWhereInput
    none?: PageWhereInput
  }

  export type PageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SocialAccountUserIdPlatformAccountIdCompoundUniqueInput = {
    userId: string
    platform: string
    accountId: string
  }

  export type SocialAccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    accountId?: SortOrder
    accountName?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    scope?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SocialAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    accountId?: SortOrder
    accountName?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    scope?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SocialAccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    accountId?: SortOrder
    accountName?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    scope?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SocialAccountScalarRelationFilter = {
    is?: SocialAccountWhereInput
    isNot?: SocialAccountWhereInput
  }

  export type PostPageListRelationFilter = {
    every?: PostPageWhereInput
    some?: PostPageWhereInput
    none?: PostPageWhereInput
  }

  export type PostPageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageSocialAccountIdPageIdCompoundUniqueInput = {
    socialAccountId: string
    pageId: string
  }

  export type PageCountOrderByAggregateInput = {
    id?: SortOrder
    socialAccountId?: SortOrder
    pageId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    about?: SortOrder
    picture?: SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    id?: SortOrder
    socialAccountId?: SortOrder
    pageId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    about?: SortOrder
    picture?: SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    id?: SortOrder
    socialAccountId?: SortOrder
    pageId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    about?: SortOrder
    picture?: SortOrder
    accessToken?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusFilter<$PrismaModel> | $Enums.PostStatus
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    mediaType?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mediaType?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mediaType?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostStatusFilter<$PrismaModel>
    _max?: NestedEnumPostStatusFilter<$PrismaModel>
  }

  export type EnumPostPageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostPageStatus | EnumPostPageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostPageStatus[] | ListEnumPostPageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostPageStatus[] | ListEnumPostPageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostPageStatusFilter<$PrismaModel> | $Enums.PostPageStatus
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type PageScalarRelationFilter = {
    is?: PageWhereInput
    isNot?: PageWhereInput
  }

  export type PostPagePostIdPageIdCompoundUniqueInput = {
    postId: string
    pageId: string
  }

  export type PostPageCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    pageId?: SortOrder
    status?: SortOrder
    fbPostId?: SortOrder
    errorMsg?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostPageMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    pageId?: SortOrder
    status?: SortOrder
    fbPostId?: SortOrder
    errorMsg?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostPageMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    pageId?: SortOrder
    status?: SortOrder
    fbPostId?: SortOrder
    errorMsg?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPostPageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostPageStatus | EnumPostPageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostPageStatus[] | ListEnumPostPageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostPageStatus[] | ListEnumPostPageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostPageStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostPageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostPageStatusFilter<$PrismaModel>
    _max?: NestedEnumPostPageStatusFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PostAnalyticsCountOrderByAggregateInput = {
    id?: SortOrder
    fbPostId?: SortOrder
    pageId?: SortOrder
    likes?: SortOrder
    comments?: SortOrder
    shares?: SortOrder
    reach?: SortOrder
    impressions?: SortOrder
    clicks?: SortOrder
    lastSyncAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostAnalyticsAvgOrderByAggregateInput = {
    likes?: SortOrder
    comments?: SortOrder
    shares?: SortOrder
    reach?: SortOrder
    impressions?: SortOrder
    clicks?: SortOrder
  }

  export type PostAnalyticsMaxOrderByAggregateInput = {
    id?: SortOrder
    fbPostId?: SortOrder
    pageId?: SortOrder
    likes?: SortOrder
    comments?: SortOrder
    shares?: SortOrder
    reach?: SortOrder
    impressions?: SortOrder
    clicks?: SortOrder
    lastSyncAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostAnalyticsMinOrderByAggregateInput = {
    id?: SortOrder
    fbPostId?: SortOrder
    pageId?: SortOrder
    likes?: SortOrder
    comments?: SortOrder
    shares?: SortOrder
    reach?: SortOrder
    impressions?: SortOrder
    clicks?: SortOrder
    lastSyncAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostAnalyticsSumOrderByAggregateInput = {
    likes?: SortOrder
    comments?: SortOrder
    shares?: SortOrder
    reach?: SortOrder
    impressions?: SortOrder
    clicks?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SocialAccountCreateNestedManyWithoutUserInput = {
    create?: XOR<SocialAccountCreateWithoutUserInput, SocialAccountUncheckedCreateWithoutUserInput> | SocialAccountCreateWithoutUserInput[] | SocialAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialAccountCreateOrConnectWithoutUserInput | SocialAccountCreateOrConnectWithoutUserInput[]
    createMany?: SocialAccountCreateManyUserInputEnvelope
    connect?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type SocialAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SocialAccountCreateWithoutUserInput, SocialAccountUncheckedCreateWithoutUserInput> | SocialAccountCreateWithoutUserInput[] | SocialAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialAccountCreateOrConnectWithoutUserInput | SocialAccountCreateOrConnectWithoutUserInput[]
    createMany?: SocialAccountCreateManyUserInputEnvelope
    connect?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SocialAccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<SocialAccountCreateWithoutUserInput, SocialAccountUncheckedCreateWithoutUserInput> | SocialAccountCreateWithoutUserInput[] | SocialAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialAccountCreateOrConnectWithoutUserInput | SocialAccountCreateOrConnectWithoutUserInput[]
    upsert?: SocialAccountUpsertWithWhereUniqueWithoutUserInput | SocialAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SocialAccountCreateManyUserInputEnvelope
    set?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
    disconnect?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
    delete?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
    connect?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
    update?: SocialAccountUpdateWithWhereUniqueWithoutUserInput | SocialAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SocialAccountUpdateManyWithWhereWithoutUserInput | SocialAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SocialAccountScalarWhereInput | SocialAccountScalarWhereInput[]
  }

  export type PostUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type SocialAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SocialAccountCreateWithoutUserInput, SocialAccountUncheckedCreateWithoutUserInput> | SocialAccountCreateWithoutUserInput[] | SocialAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialAccountCreateOrConnectWithoutUserInput | SocialAccountCreateOrConnectWithoutUserInput[]
    upsert?: SocialAccountUpsertWithWhereUniqueWithoutUserInput | SocialAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SocialAccountCreateManyUserInputEnvelope
    set?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
    disconnect?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
    delete?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
    connect?: SocialAccountWhereUniqueInput | SocialAccountWhereUniqueInput[]
    update?: SocialAccountUpdateWithWhereUniqueWithoutUserInput | SocialAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SocialAccountUpdateManyWithWhereWithoutUserInput | SocialAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SocialAccountScalarWhereInput | SocialAccountScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSocialAccountsInput = {
    create?: XOR<UserCreateWithoutSocialAccountsInput, UserUncheckedCreateWithoutSocialAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocialAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type PageCreateNestedManyWithoutSocialAccountInput = {
    create?: XOR<PageCreateWithoutSocialAccountInput, PageUncheckedCreateWithoutSocialAccountInput> | PageCreateWithoutSocialAccountInput[] | PageUncheckedCreateWithoutSocialAccountInput[]
    connectOrCreate?: PageCreateOrConnectWithoutSocialAccountInput | PageCreateOrConnectWithoutSocialAccountInput[]
    createMany?: PageCreateManySocialAccountInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type PageUncheckedCreateNestedManyWithoutSocialAccountInput = {
    create?: XOR<PageCreateWithoutSocialAccountInput, PageUncheckedCreateWithoutSocialAccountInput> | PageCreateWithoutSocialAccountInput[] | PageUncheckedCreateWithoutSocialAccountInput[]
    connectOrCreate?: PageCreateOrConnectWithoutSocialAccountInput | PageCreateOrConnectWithoutSocialAccountInput[]
    createMany?: PageCreateManySocialAccountInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutSocialAccountsNestedInput = {
    create?: XOR<UserCreateWithoutSocialAccountsInput, UserUncheckedCreateWithoutSocialAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocialAccountsInput
    upsert?: UserUpsertWithoutSocialAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSocialAccountsInput, UserUpdateWithoutSocialAccountsInput>, UserUncheckedUpdateWithoutSocialAccountsInput>
  }

  export type PageUpdateManyWithoutSocialAccountNestedInput = {
    create?: XOR<PageCreateWithoutSocialAccountInput, PageUncheckedCreateWithoutSocialAccountInput> | PageCreateWithoutSocialAccountInput[] | PageUncheckedCreateWithoutSocialAccountInput[]
    connectOrCreate?: PageCreateOrConnectWithoutSocialAccountInput | PageCreateOrConnectWithoutSocialAccountInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutSocialAccountInput | PageUpsertWithWhereUniqueWithoutSocialAccountInput[]
    createMany?: PageCreateManySocialAccountInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutSocialAccountInput | PageUpdateWithWhereUniqueWithoutSocialAccountInput[]
    updateMany?: PageUpdateManyWithWhereWithoutSocialAccountInput | PageUpdateManyWithWhereWithoutSocialAccountInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type PageUncheckedUpdateManyWithoutSocialAccountNestedInput = {
    create?: XOR<PageCreateWithoutSocialAccountInput, PageUncheckedCreateWithoutSocialAccountInput> | PageCreateWithoutSocialAccountInput[] | PageUncheckedCreateWithoutSocialAccountInput[]
    connectOrCreate?: PageCreateOrConnectWithoutSocialAccountInput | PageCreateOrConnectWithoutSocialAccountInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutSocialAccountInput | PageUpsertWithWhereUniqueWithoutSocialAccountInput[]
    createMany?: PageCreateManySocialAccountInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutSocialAccountInput | PageUpdateWithWhereUniqueWithoutSocialAccountInput[]
    updateMany?: PageUpdateManyWithWhereWithoutSocialAccountInput | PageUpdateManyWithWhereWithoutSocialAccountInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type SocialAccountCreateNestedOneWithoutPagesInput = {
    create?: XOR<SocialAccountCreateWithoutPagesInput, SocialAccountUncheckedCreateWithoutPagesInput>
    connectOrCreate?: SocialAccountCreateOrConnectWithoutPagesInput
    connect?: SocialAccountWhereUniqueInput
  }

  export type PostPageCreateNestedManyWithoutPageInput = {
    create?: XOR<PostPageCreateWithoutPageInput, PostPageUncheckedCreateWithoutPageInput> | PostPageCreateWithoutPageInput[] | PostPageUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PostPageCreateOrConnectWithoutPageInput | PostPageCreateOrConnectWithoutPageInput[]
    createMany?: PostPageCreateManyPageInputEnvelope
    connect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
  }

  export type PostPageUncheckedCreateNestedManyWithoutPageInput = {
    create?: XOR<PostPageCreateWithoutPageInput, PostPageUncheckedCreateWithoutPageInput> | PostPageCreateWithoutPageInput[] | PostPageUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PostPageCreateOrConnectWithoutPageInput | PostPageCreateOrConnectWithoutPageInput[]
    createMany?: PostPageCreateManyPageInputEnvelope
    connect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
  }

  export type SocialAccountUpdateOneRequiredWithoutPagesNestedInput = {
    create?: XOR<SocialAccountCreateWithoutPagesInput, SocialAccountUncheckedCreateWithoutPagesInput>
    connectOrCreate?: SocialAccountCreateOrConnectWithoutPagesInput
    upsert?: SocialAccountUpsertWithoutPagesInput
    connect?: SocialAccountWhereUniqueInput
    update?: XOR<XOR<SocialAccountUpdateToOneWithWhereWithoutPagesInput, SocialAccountUpdateWithoutPagesInput>, SocialAccountUncheckedUpdateWithoutPagesInput>
  }

  export type PostPageUpdateManyWithoutPageNestedInput = {
    create?: XOR<PostPageCreateWithoutPageInput, PostPageUncheckedCreateWithoutPageInput> | PostPageCreateWithoutPageInput[] | PostPageUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PostPageCreateOrConnectWithoutPageInput | PostPageCreateOrConnectWithoutPageInput[]
    upsert?: PostPageUpsertWithWhereUniqueWithoutPageInput | PostPageUpsertWithWhereUniqueWithoutPageInput[]
    createMany?: PostPageCreateManyPageInputEnvelope
    set?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    disconnect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    delete?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    connect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    update?: PostPageUpdateWithWhereUniqueWithoutPageInput | PostPageUpdateWithWhereUniqueWithoutPageInput[]
    updateMany?: PostPageUpdateManyWithWhereWithoutPageInput | PostPageUpdateManyWithWhereWithoutPageInput[]
    deleteMany?: PostPageScalarWhereInput | PostPageScalarWhereInput[]
  }

  export type PostPageUncheckedUpdateManyWithoutPageNestedInput = {
    create?: XOR<PostPageCreateWithoutPageInput, PostPageUncheckedCreateWithoutPageInput> | PostPageCreateWithoutPageInput[] | PostPageUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PostPageCreateOrConnectWithoutPageInput | PostPageCreateOrConnectWithoutPageInput[]
    upsert?: PostPageUpsertWithWhereUniqueWithoutPageInput | PostPageUpsertWithWhereUniqueWithoutPageInput[]
    createMany?: PostPageCreateManyPageInputEnvelope
    set?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    disconnect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    delete?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    connect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    update?: PostPageUpdateWithWhereUniqueWithoutPageInput | PostPageUpdateWithWhereUniqueWithoutPageInput[]
    updateMany?: PostPageUpdateManyWithWhereWithoutPageInput | PostPageUpdateManyWithWhereWithoutPageInput[]
    deleteMany?: PostPageScalarWhereInput | PostPageScalarWhereInput[]
  }

  export type PostCreatemediaUrlsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostPageCreateNestedManyWithoutPostInput = {
    create?: XOR<PostPageCreateWithoutPostInput, PostPageUncheckedCreateWithoutPostInput> | PostPageCreateWithoutPostInput[] | PostPageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPageCreateOrConnectWithoutPostInput | PostPageCreateOrConnectWithoutPostInput[]
    createMany?: PostPageCreateManyPostInputEnvelope
    connect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
  }

  export type PostPageUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostPageCreateWithoutPostInput, PostPageUncheckedCreateWithoutPostInput> | PostPageCreateWithoutPostInput[] | PostPageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPageCreateOrConnectWithoutPostInput | PostPageCreateOrConnectWithoutPostInput[]
    createMany?: PostPageCreateManyPostInputEnvelope
    connect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
  }

  export type PostUpdatemediaUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumPostStatusFieldUpdateOperationsInput = {
    set?: $Enums.PostStatus
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type PostPageUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostPageCreateWithoutPostInput, PostPageUncheckedCreateWithoutPostInput> | PostPageCreateWithoutPostInput[] | PostPageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPageCreateOrConnectWithoutPostInput | PostPageCreateOrConnectWithoutPostInput[]
    upsert?: PostPageUpsertWithWhereUniqueWithoutPostInput | PostPageUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostPageCreateManyPostInputEnvelope
    set?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    disconnect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    delete?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    connect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    update?: PostPageUpdateWithWhereUniqueWithoutPostInput | PostPageUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostPageUpdateManyWithWhereWithoutPostInput | PostPageUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostPageScalarWhereInput | PostPageScalarWhereInput[]
  }

  export type PostPageUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostPageCreateWithoutPostInput, PostPageUncheckedCreateWithoutPostInput> | PostPageCreateWithoutPostInput[] | PostPageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostPageCreateOrConnectWithoutPostInput | PostPageCreateOrConnectWithoutPostInput[]
    upsert?: PostPageUpsertWithWhereUniqueWithoutPostInput | PostPageUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostPageCreateManyPostInputEnvelope
    set?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    disconnect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    delete?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    connect?: PostPageWhereUniqueInput | PostPageWhereUniqueInput[]
    update?: PostPageUpdateWithWhereUniqueWithoutPostInput | PostPageUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostPageUpdateManyWithWhereWithoutPostInput | PostPageUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostPageScalarWhereInput | PostPageScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutPostPagesInput = {
    create?: XOR<PostCreateWithoutPostPagesInput, PostUncheckedCreateWithoutPostPagesInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostPagesInput
    connect?: PostWhereUniqueInput
  }

  export type PageCreateNestedOneWithoutPostPagesInput = {
    create?: XOR<PageCreateWithoutPostPagesInput, PageUncheckedCreateWithoutPostPagesInput>
    connectOrCreate?: PageCreateOrConnectWithoutPostPagesInput
    connect?: PageWhereUniqueInput
  }

  export type EnumPostPageStatusFieldUpdateOperationsInput = {
    set?: $Enums.PostPageStatus
  }

  export type PostUpdateOneRequiredWithoutPostPagesNestedInput = {
    create?: XOR<PostCreateWithoutPostPagesInput, PostUncheckedCreateWithoutPostPagesInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostPagesInput
    upsert?: PostUpsertWithoutPostPagesInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutPostPagesInput, PostUpdateWithoutPostPagesInput>, PostUncheckedUpdateWithoutPostPagesInput>
  }

  export type PageUpdateOneRequiredWithoutPostPagesNestedInput = {
    create?: XOR<PageCreateWithoutPostPagesInput, PageUncheckedCreateWithoutPostPagesInput>
    connectOrCreate?: PageCreateOrConnectWithoutPostPagesInput
    upsert?: PageUpsertWithoutPostPagesInput
    connect?: PageWhereUniqueInput
    update?: XOR<XOR<PageUpdateToOneWithWhereWithoutPostPagesInput, PageUpdateWithoutPostPagesInput>, PageUncheckedUpdateWithoutPostPagesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusFilter<$PrismaModel> | $Enums.PostStatus
  }

  export type NestedEnumPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostStatusFilter<$PrismaModel>
    _max?: NestedEnumPostStatusFilter<$PrismaModel>
  }

  export type NestedEnumPostPageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostPageStatus | EnumPostPageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostPageStatus[] | ListEnumPostPageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostPageStatus[] | ListEnumPostPageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostPageStatusFilter<$PrismaModel> | $Enums.PostPageStatus
  }

  export type NestedEnumPostPageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostPageStatus | EnumPostPageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostPageStatus[] | ListEnumPostPageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostPageStatus[] | ListEnumPostPageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostPageStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostPageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostPageStatusFilter<$PrismaModel>
    _max?: NestedEnumPostPageStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SocialAccountCreateWithoutUserInput = {
    id?: string
    platform: string
    accountId: string
    accountName?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    scope?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutSocialAccountInput
  }

  export type SocialAccountUncheckedCreateWithoutUserInput = {
    id?: string
    platform: string
    accountId: string
    accountName?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    scope?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutSocialAccountInput
  }

  export type SocialAccountCreateOrConnectWithoutUserInput = {
    where: SocialAccountWhereUniqueInput
    create: XOR<SocialAccountCreateWithoutUserInput, SocialAccountUncheckedCreateWithoutUserInput>
  }

  export type SocialAccountCreateManyUserInputEnvelope = {
    data: SocialAccountCreateManyUserInput | SocialAccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutUserInput = {
    id?: string
    title?: string | null
    content: string
    mediaUrls?: PostCreatemediaUrlsInput | string[]
    mediaType?: string | null
    status?: $Enums.PostStatus
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postPages?: PostPageCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string | null
    content: string
    mediaUrls?: PostCreatemediaUrlsInput | string[]
    mediaType?: string | null
    status?: $Enums.PostStatus
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postPages?: PostPageUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutUserInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostCreateManyUserInputEnvelope = {
    data: PostCreateManyUserInput | PostCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SocialAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: SocialAccountWhereUniqueInput
    update: XOR<SocialAccountUpdateWithoutUserInput, SocialAccountUncheckedUpdateWithoutUserInput>
    create: XOR<SocialAccountCreateWithoutUserInput, SocialAccountUncheckedCreateWithoutUserInput>
  }

  export type SocialAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: SocialAccountWhereUniqueInput
    data: XOR<SocialAccountUpdateWithoutUserInput, SocialAccountUncheckedUpdateWithoutUserInput>
  }

  export type SocialAccountUpdateManyWithWhereWithoutUserInput = {
    where: SocialAccountScalarWhereInput
    data: XOR<SocialAccountUpdateManyMutationInput, SocialAccountUncheckedUpdateManyWithoutUserInput>
  }

  export type SocialAccountScalarWhereInput = {
    AND?: SocialAccountScalarWhereInput | SocialAccountScalarWhereInput[]
    OR?: SocialAccountScalarWhereInput[]
    NOT?: SocialAccountScalarWhereInput | SocialAccountScalarWhereInput[]
    id?: StringFilter<"SocialAccount"> | string
    userId?: StringFilter<"SocialAccount"> | string
    platform?: StringFilter<"SocialAccount"> | string
    accountId?: StringFilter<"SocialAccount"> | string
    accountName?: StringNullableFilter<"SocialAccount"> | string | null
    accessToken?: StringFilter<"SocialAccount"> | string
    refreshToken?: StringNullableFilter<"SocialAccount"> | string | null
    expiresAt?: DateTimeNullableFilter<"SocialAccount"> | Date | string | null
    scope?: StringNullableFilter<"SocialAccount"> | string | null
    isActive?: BoolFilter<"SocialAccount"> | boolean
    createdAt?: DateTimeFilter<"SocialAccount"> | Date | string
    updatedAt?: DateTimeFilter<"SocialAccount"> | Date | string
  }

  export type PostUpsertWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostUpdateWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
  }

  export type PostUpdateManyWithWhereWithoutUserInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutUserInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: StringFilter<"Post"> | string
    userId?: StringFilter<"Post"> | string
    title?: StringNullableFilter<"Post"> | string | null
    content?: StringFilter<"Post"> | string
    mediaUrls?: StringNullableListFilter<"Post">
    mediaType?: StringNullableFilter<"Post"> | string | null
    status?: EnumPostStatusFilter<"Post"> | $Enums.PostStatus
    scheduledAt?: DateTimeNullableFilter<"Post"> | Date | string | null
    publishedAt?: DateTimeNullableFilter<"Post"> | Date | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }

  export type UserCreateWithoutSocialAccountsInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSocialAccountsInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSocialAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSocialAccountsInput, UserUncheckedCreateWithoutSocialAccountsInput>
  }

  export type PageCreateWithoutSocialAccountInput = {
    id?: string
    pageId: string
    name: string
    category?: string | null
    about?: string | null
    picture?: string | null
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    postPages?: PostPageCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutSocialAccountInput = {
    id?: string
    pageId: string
    name: string
    category?: string | null
    about?: string | null
    picture?: string | null
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    postPages?: PostPageUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutSocialAccountInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutSocialAccountInput, PageUncheckedCreateWithoutSocialAccountInput>
  }

  export type PageCreateManySocialAccountInputEnvelope = {
    data: PageCreateManySocialAccountInput | PageCreateManySocialAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSocialAccountsInput = {
    update: XOR<UserUpdateWithoutSocialAccountsInput, UserUncheckedUpdateWithoutSocialAccountsInput>
    create: XOR<UserCreateWithoutSocialAccountsInput, UserUncheckedCreateWithoutSocialAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSocialAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSocialAccountsInput, UserUncheckedUpdateWithoutSocialAccountsInput>
  }

  export type UserUpdateWithoutSocialAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSocialAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PageUpsertWithWhereUniqueWithoutSocialAccountInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutSocialAccountInput, PageUncheckedUpdateWithoutSocialAccountInput>
    create: XOR<PageCreateWithoutSocialAccountInput, PageUncheckedCreateWithoutSocialAccountInput>
  }

  export type PageUpdateWithWhereUniqueWithoutSocialAccountInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutSocialAccountInput, PageUncheckedUpdateWithoutSocialAccountInput>
  }

  export type PageUpdateManyWithWhereWithoutSocialAccountInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutSocialAccountInput>
  }

  export type PageScalarWhereInput = {
    AND?: PageScalarWhereInput | PageScalarWhereInput[]
    OR?: PageScalarWhereInput[]
    NOT?: PageScalarWhereInput | PageScalarWhereInput[]
    id?: StringFilter<"Page"> | string
    socialAccountId?: StringFilter<"Page"> | string
    pageId?: StringFilter<"Page"> | string
    name?: StringFilter<"Page"> | string
    category?: StringNullableFilter<"Page"> | string | null
    about?: StringNullableFilter<"Page"> | string | null
    picture?: StringNullableFilter<"Page"> | string | null
    accessToken?: StringFilter<"Page"> | string
    isActive?: BoolFilter<"Page"> | boolean
    createdAt?: DateTimeFilter<"Page"> | Date | string
    updatedAt?: DateTimeFilter<"Page"> | Date | string
  }

  export type SocialAccountCreateWithoutPagesInput = {
    id?: string
    platform: string
    accountId: string
    accountName?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    scope?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSocialAccountsInput
  }

  export type SocialAccountUncheckedCreateWithoutPagesInput = {
    id?: string
    userId: string
    platform: string
    accountId: string
    accountName?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    scope?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SocialAccountCreateOrConnectWithoutPagesInput = {
    where: SocialAccountWhereUniqueInput
    create: XOR<SocialAccountCreateWithoutPagesInput, SocialAccountUncheckedCreateWithoutPagesInput>
  }

  export type PostPageCreateWithoutPageInput = {
    id?: string
    status?: $Enums.PostPageStatus
    fbPostId?: string | null
    errorMsg?: string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    post: PostCreateNestedOneWithoutPostPagesInput
  }

  export type PostPageUncheckedCreateWithoutPageInput = {
    id?: string
    postId: string
    status?: $Enums.PostPageStatus
    fbPostId?: string | null
    errorMsg?: string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostPageCreateOrConnectWithoutPageInput = {
    where: PostPageWhereUniqueInput
    create: XOR<PostPageCreateWithoutPageInput, PostPageUncheckedCreateWithoutPageInput>
  }

  export type PostPageCreateManyPageInputEnvelope = {
    data: PostPageCreateManyPageInput | PostPageCreateManyPageInput[]
    skipDuplicates?: boolean
  }

  export type SocialAccountUpsertWithoutPagesInput = {
    update: XOR<SocialAccountUpdateWithoutPagesInput, SocialAccountUncheckedUpdateWithoutPagesInput>
    create: XOR<SocialAccountCreateWithoutPagesInput, SocialAccountUncheckedCreateWithoutPagesInput>
    where?: SocialAccountWhereInput
  }

  export type SocialAccountUpdateToOneWithWhereWithoutPagesInput = {
    where?: SocialAccountWhereInput
    data: XOR<SocialAccountUpdateWithoutPagesInput, SocialAccountUncheckedUpdateWithoutPagesInput>
  }

  export type SocialAccountUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSocialAccountsNestedInput
  }

  export type SocialAccountUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPageUpsertWithWhereUniqueWithoutPageInput = {
    where: PostPageWhereUniqueInput
    update: XOR<PostPageUpdateWithoutPageInput, PostPageUncheckedUpdateWithoutPageInput>
    create: XOR<PostPageCreateWithoutPageInput, PostPageUncheckedCreateWithoutPageInput>
  }

  export type PostPageUpdateWithWhereUniqueWithoutPageInput = {
    where: PostPageWhereUniqueInput
    data: XOR<PostPageUpdateWithoutPageInput, PostPageUncheckedUpdateWithoutPageInput>
  }

  export type PostPageUpdateManyWithWhereWithoutPageInput = {
    where: PostPageScalarWhereInput
    data: XOR<PostPageUpdateManyMutationInput, PostPageUncheckedUpdateManyWithoutPageInput>
  }

  export type PostPageScalarWhereInput = {
    AND?: PostPageScalarWhereInput | PostPageScalarWhereInput[]
    OR?: PostPageScalarWhereInput[]
    NOT?: PostPageScalarWhereInput | PostPageScalarWhereInput[]
    id?: StringFilter<"PostPage"> | string
    postId?: StringFilter<"PostPage"> | string
    pageId?: StringFilter<"PostPage"> | string
    status?: EnumPostPageStatusFilter<"PostPage"> | $Enums.PostPageStatus
    fbPostId?: StringNullableFilter<"PostPage"> | string | null
    errorMsg?: StringNullableFilter<"PostPage"> | string | null
    publishedAt?: DateTimeNullableFilter<"PostPage"> | Date | string | null
    createdAt?: DateTimeFilter<"PostPage"> | Date | string
    updatedAt?: DateTimeFilter<"PostPage"> | Date | string
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    socialAccounts?: SocialAccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    socialAccounts?: SocialAccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type PostPageCreateWithoutPostInput = {
    id?: string
    status?: $Enums.PostPageStatus
    fbPostId?: string | null
    errorMsg?: string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    page: PageCreateNestedOneWithoutPostPagesInput
  }

  export type PostPageUncheckedCreateWithoutPostInput = {
    id?: string
    pageId: string
    status?: $Enums.PostPageStatus
    fbPostId?: string | null
    errorMsg?: string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostPageCreateOrConnectWithoutPostInput = {
    where: PostPageWhereUniqueInput
    create: XOR<PostPageCreateWithoutPostInput, PostPageUncheckedCreateWithoutPostInput>
  }

  export type PostPageCreateManyPostInputEnvelope = {
    data: PostPageCreateManyPostInput | PostPageCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialAccounts?: SocialAccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialAccounts?: SocialAccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PostPageUpsertWithWhereUniqueWithoutPostInput = {
    where: PostPageWhereUniqueInput
    update: XOR<PostPageUpdateWithoutPostInput, PostPageUncheckedUpdateWithoutPostInput>
    create: XOR<PostPageCreateWithoutPostInput, PostPageUncheckedCreateWithoutPostInput>
  }

  export type PostPageUpdateWithWhereUniqueWithoutPostInput = {
    where: PostPageWhereUniqueInput
    data: XOR<PostPageUpdateWithoutPostInput, PostPageUncheckedUpdateWithoutPostInput>
  }

  export type PostPageUpdateManyWithWhereWithoutPostInput = {
    where: PostPageScalarWhereInput
    data: XOR<PostPageUpdateManyMutationInput, PostPageUncheckedUpdateManyWithoutPostInput>
  }

  export type PostCreateWithoutPostPagesInput = {
    id?: string
    title?: string | null
    content: string
    mediaUrls?: PostCreatemediaUrlsInput | string[]
    mediaType?: string | null
    status?: $Enums.PostStatus
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutPostPagesInput = {
    id?: string
    userId: string
    title?: string | null
    content: string
    mediaUrls?: PostCreatemediaUrlsInput | string[]
    mediaType?: string | null
    status?: $Enums.PostStatus
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCreateOrConnectWithoutPostPagesInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutPostPagesInput, PostUncheckedCreateWithoutPostPagesInput>
  }

  export type PageCreateWithoutPostPagesInput = {
    id?: string
    pageId: string
    name: string
    category?: string | null
    about?: string | null
    picture?: string | null
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socialAccount: SocialAccountCreateNestedOneWithoutPagesInput
  }

  export type PageUncheckedCreateWithoutPostPagesInput = {
    id?: string
    socialAccountId: string
    pageId: string
    name: string
    category?: string | null
    about?: string | null
    picture?: string | null
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageCreateOrConnectWithoutPostPagesInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutPostPagesInput, PageUncheckedCreateWithoutPostPagesInput>
  }

  export type PostUpsertWithoutPostPagesInput = {
    update: XOR<PostUpdateWithoutPostPagesInput, PostUncheckedUpdateWithoutPostPagesInput>
    create: XOR<PostCreateWithoutPostPagesInput, PostUncheckedCreateWithoutPostPagesInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutPostPagesInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutPostPagesInput, PostUncheckedUpdateWithoutPostPagesInput>
  }

  export type PostUpdateWithoutPostPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: PostUpdatemediaUrlsInput | string[]
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutPostPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: PostUpdatemediaUrlsInput | string[]
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpsertWithoutPostPagesInput = {
    update: XOR<PageUpdateWithoutPostPagesInput, PageUncheckedUpdateWithoutPostPagesInput>
    create: XOR<PageCreateWithoutPostPagesInput, PageUncheckedCreateWithoutPostPagesInput>
    where?: PageWhereInput
  }

  export type PageUpdateToOneWithWhereWithoutPostPagesInput = {
    where?: PageWhereInput
    data: XOR<PageUpdateWithoutPostPagesInput, PageUncheckedUpdateWithoutPostPagesInput>
  }

  export type PageUpdateWithoutPostPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialAccount?: SocialAccountUpdateOneRequiredWithoutPagesNestedInput
  }

  export type PageUncheckedUpdateWithoutPostPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    socialAccountId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialAccountCreateManyUserInput = {
    id?: string
    platform: string
    accountId: string
    accountName?: string | null
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    scope?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCreateManyUserInput = {
    id?: string
    title?: string | null
    content: string
    mediaUrls?: PostCreatemediaUrlsInput | string[]
    mediaType?: string | null
    status?: $Enums.PostStatus
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SocialAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutSocialAccountNestedInput
  }

  export type SocialAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutSocialAccountNestedInput
  }

  export type SocialAccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountName?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: PostUpdatemediaUrlsInput | string[]
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postPages?: PostPageUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: PostUpdatemediaUrlsInput | string[]
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postPages?: PostPageUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: PostUpdatemediaUrlsInput | string[]
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateManySocialAccountInput = {
    id?: string
    pageId: string
    name: string
    category?: string | null
    about?: string | null
    picture?: string | null
    accessToken: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUpdateWithoutSocialAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postPages?: PostPageUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutSocialAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postPages?: PostPageUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutSocialAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPageCreateManyPageInput = {
    id?: string
    postId: string
    status?: $Enums.PostPageStatus
    fbPostId?: string | null
    errorMsg?: string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostPageUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutPostPagesNestedInput
  }

  export type PostPageUncheckedUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPageUncheckedUpdateManyWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPageCreateManyPostInput = {
    id?: string
    pageId: string
    status?: $Enums.PostPageStatus
    fbPostId?: string | null
    errorMsg?: string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostPageUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: PageUpdateOneRequiredWithoutPostPagesNestedInput
  }

  export type PostPageUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostPageUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    status?: EnumPostPageStatusFieldUpdateOperationsInput | $Enums.PostPageStatus
    fbPostId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}