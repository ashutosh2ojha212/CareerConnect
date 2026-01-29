
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
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model EmployeeProfile
 * 
 */
export type EmployeeProfile = $Result.DefaultSelection<Prisma.$EmployeeProfilePayload>
/**
 * Model JobPost
 * 
 */
export type JobPost = $Result.DefaultSelection<Prisma.$JobPostPayload>
/**
 * Model JobCustomFormField
 * 
 */
export type JobCustomFormField = $Result.DefaultSelection<Prisma.$JobCustomFormFieldPayload>
/**
 * Model ReferralApplication
 * 
 */
export type ReferralApplication = $Result.DefaultSelection<Prisma.$ReferralApplicationPayload>
/**
 * Model ReferralForm
 * 
 */
export type ReferralForm = $Result.DefaultSelection<Prisma.$ReferralFormPayload>
/**
 * Model JobSeekerProfile
 * 
 */
export type JobSeekerProfile = $Result.DefaultSelection<Prisma.$JobSeekerProfilePayload>
/**
 * Model ReferralInvitation
 * 
 */
export type ReferralInvitation = $Result.DefaultSelection<Prisma.$ReferralInvitationPayload>

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
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs>;

  /**
   * `prisma.employeeProfile`: Exposes CRUD operations for the **EmployeeProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeProfiles
    * const employeeProfiles = await prisma.employeeProfile.findMany()
    * ```
    */
  get employeeProfile(): Prisma.EmployeeProfileDelegate<ExtArgs>;

  /**
   * `prisma.jobPost`: Exposes CRUD operations for the **JobPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobPosts
    * const jobPosts = await prisma.jobPost.findMany()
    * ```
    */
  get jobPost(): Prisma.JobPostDelegate<ExtArgs>;

  /**
   * `prisma.jobCustomFormField`: Exposes CRUD operations for the **JobCustomFormField** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobCustomFormFields
    * const jobCustomFormFields = await prisma.jobCustomFormField.findMany()
    * ```
    */
  get jobCustomFormField(): Prisma.JobCustomFormFieldDelegate<ExtArgs>;

  /**
   * `prisma.referralApplication`: Exposes CRUD operations for the **ReferralApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReferralApplications
    * const referralApplications = await prisma.referralApplication.findMany()
    * ```
    */
  get referralApplication(): Prisma.ReferralApplicationDelegate<ExtArgs>;

  /**
   * `prisma.referralForm`: Exposes CRUD operations for the **ReferralForm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReferralForms
    * const referralForms = await prisma.referralForm.findMany()
    * ```
    */
  get referralForm(): Prisma.ReferralFormDelegate<ExtArgs>;

  /**
   * `prisma.jobSeekerProfile`: Exposes CRUD operations for the **JobSeekerProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobSeekerProfiles
    * const jobSeekerProfiles = await prisma.jobSeekerProfile.findMany()
    * ```
    */
  get jobSeekerProfile(): Prisma.JobSeekerProfileDelegate<ExtArgs>;

  /**
   * `prisma.referralInvitation`: Exposes CRUD operations for the **ReferralInvitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReferralInvitations
    * const referralInvitations = await prisma.referralInvitation.findMany()
    * ```
    */
  get referralInvitation(): Prisma.ReferralInvitationDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Company: 'Company',
    EmployeeProfile: 'EmployeeProfile',
    JobPost: 'JobPost',
    JobCustomFormField: 'JobCustomFormField',
    ReferralApplication: 'ReferralApplication',
    ReferralForm: 'ReferralForm',
    JobSeekerProfile: 'JobSeekerProfile',
    ReferralInvitation: 'ReferralInvitation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "company" | "employeeProfile" | "jobPost" | "jobCustomFormField" | "referralApplication" | "referralForm" | "jobSeekerProfile" | "referralInvitation"
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
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      EmployeeProfile: {
        payload: Prisma.$EmployeeProfilePayload<ExtArgs>
        fields: Prisma.EmployeeProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          findFirst: {
            args: Prisma.EmployeeProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          findMany: {
            args: Prisma.EmployeeProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>[]
          }
          create: {
            args: Prisma.EmployeeProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          createMany: {
            args: Prisma.EmployeeProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>[]
          }
          delete: {
            args: Prisma.EmployeeProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          update: {
            args: Prisma.EmployeeProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmployeeProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          aggregate: {
            args: Prisma.EmployeeProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeProfile>
          }
          groupBy: {
            args: Prisma.EmployeeProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeProfileCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeProfileCountAggregateOutputType> | number
          }
        }
      }
      JobPost: {
        payload: Prisma.$JobPostPayload<ExtArgs>
        fields: Prisma.JobPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload>
          }
          findFirst: {
            args: Prisma.JobPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload>
          }
          findMany: {
            args: Prisma.JobPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload>[]
          }
          create: {
            args: Prisma.JobPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload>
          }
          createMany: {
            args: Prisma.JobPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload>[]
          }
          delete: {
            args: Prisma.JobPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload>
          }
          update: {
            args: Prisma.JobPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload>
          }
          deleteMany: {
            args: Prisma.JobPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostPayload>
          }
          aggregate: {
            args: Prisma.JobPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobPost>
          }
          groupBy: {
            args: Prisma.JobPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobPostCountArgs<ExtArgs>
            result: $Utils.Optional<JobPostCountAggregateOutputType> | number
          }
        }
      }
      JobCustomFormField: {
        payload: Prisma.$JobCustomFormFieldPayload<ExtArgs>
        fields: Prisma.JobCustomFormFieldFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobCustomFormFieldFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobCustomFormFieldFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload>
          }
          findFirst: {
            args: Prisma.JobCustomFormFieldFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobCustomFormFieldFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload>
          }
          findMany: {
            args: Prisma.JobCustomFormFieldFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload>[]
          }
          create: {
            args: Prisma.JobCustomFormFieldCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload>
          }
          createMany: {
            args: Prisma.JobCustomFormFieldCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCustomFormFieldCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload>[]
          }
          delete: {
            args: Prisma.JobCustomFormFieldDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload>
          }
          update: {
            args: Prisma.JobCustomFormFieldUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload>
          }
          deleteMany: {
            args: Prisma.JobCustomFormFieldDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobCustomFormFieldUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobCustomFormFieldUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCustomFormFieldPayload>
          }
          aggregate: {
            args: Prisma.JobCustomFormFieldAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobCustomFormField>
          }
          groupBy: {
            args: Prisma.JobCustomFormFieldGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobCustomFormFieldGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCustomFormFieldCountArgs<ExtArgs>
            result: $Utils.Optional<JobCustomFormFieldCountAggregateOutputType> | number
          }
        }
      }
      ReferralApplication: {
        payload: Prisma.$ReferralApplicationPayload<ExtArgs>
        fields: Prisma.ReferralApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReferralApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReferralApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload>
          }
          findFirst: {
            args: Prisma.ReferralApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReferralApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload>
          }
          findMany: {
            args: Prisma.ReferralApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload>[]
          }
          create: {
            args: Prisma.ReferralApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload>
          }
          createMany: {
            args: Prisma.ReferralApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReferralApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload>[]
          }
          delete: {
            args: Prisma.ReferralApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload>
          }
          update: {
            args: Prisma.ReferralApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload>
          }
          deleteMany: {
            args: Prisma.ReferralApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReferralApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReferralApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralApplicationPayload>
          }
          aggregate: {
            args: Prisma.ReferralApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReferralApplication>
          }
          groupBy: {
            args: Prisma.ReferralApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReferralApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReferralApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<ReferralApplicationCountAggregateOutputType> | number
          }
        }
      }
      ReferralForm: {
        payload: Prisma.$ReferralFormPayload<ExtArgs>
        fields: Prisma.ReferralFormFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReferralFormFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReferralFormFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload>
          }
          findFirst: {
            args: Prisma.ReferralFormFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReferralFormFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload>
          }
          findMany: {
            args: Prisma.ReferralFormFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload>[]
          }
          create: {
            args: Prisma.ReferralFormCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload>
          }
          createMany: {
            args: Prisma.ReferralFormCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReferralFormCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload>[]
          }
          delete: {
            args: Prisma.ReferralFormDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload>
          }
          update: {
            args: Prisma.ReferralFormUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload>
          }
          deleteMany: {
            args: Prisma.ReferralFormDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReferralFormUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReferralFormUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralFormPayload>
          }
          aggregate: {
            args: Prisma.ReferralFormAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReferralForm>
          }
          groupBy: {
            args: Prisma.ReferralFormGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReferralFormGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReferralFormCountArgs<ExtArgs>
            result: $Utils.Optional<ReferralFormCountAggregateOutputType> | number
          }
        }
      }
      JobSeekerProfile: {
        payload: Prisma.$JobSeekerProfilePayload<ExtArgs>
        fields: Prisma.JobSeekerProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobSeekerProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobSeekerProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload>
          }
          findFirst: {
            args: Prisma.JobSeekerProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobSeekerProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload>
          }
          findMany: {
            args: Prisma.JobSeekerProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload>[]
          }
          create: {
            args: Prisma.JobSeekerProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload>
          }
          createMany: {
            args: Prisma.JobSeekerProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobSeekerProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload>[]
          }
          delete: {
            args: Prisma.JobSeekerProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload>
          }
          update: {
            args: Prisma.JobSeekerProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload>
          }
          deleteMany: {
            args: Prisma.JobSeekerProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobSeekerProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobSeekerProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerProfilePayload>
          }
          aggregate: {
            args: Prisma.JobSeekerProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobSeekerProfile>
          }
          groupBy: {
            args: Prisma.JobSeekerProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobSeekerProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobSeekerProfileCountArgs<ExtArgs>
            result: $Utils.Optional<JobSeekerProfileCountAggregateOutputType> | number
          }
        }
      }
      ReferralInvitation: {
        payload: Prisma.$ReferralInvitationPayload<ExtArgs>
        fields: Prisma.ReferralInvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReferralInvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReferralInvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload>
          }
          findFirst: {
            args: Prisma.ReferralInvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReferralInvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload>
          }
          findMany: {
            args: Prisma.ReferralInvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload>[]
          }
          create: {
            args: Prisma.ReferralInvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload>
          }
          createMany: {
            args: Prisma.ReferralInvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReferralInvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload>[]
          }
          delete: {
            args: Prisma.ReferralInvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload>
          }
          update: {
            args: Prisma.ReferralInvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload>
          }
          deleteMany: {
            args: Prisma.ReferralInvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReferralInvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReferralInvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralInvitationPayload>
          }
          aggregate: {
            args: Prisma.ReferralInvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReferralInvitation>
          }
          groupBy: {
            args: Prisma.ReferralInvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReferralInvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReferralInvitationCountArgs<ExtArgs>
            result: $Utils.Optional<ReferralInvitationCountAggregateOutputType> | number
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
    applications: number
    jobPosts: number
    sentInvitations: number
    receivedInvitations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | UserCountOutputTypeCountApplicationsArgs
    jobPosts?: boolean | UserCountOutputTypeCountJobPostsArgs
    sentInvitations?: boolean | UserCountOutputTypeCountSentInvitationsArgs
    receivedInvitations?: boolean | UserCountOutputTypeCountReceivedInvitationsArgs
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
  export type UserCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralApplicationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJobPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobPostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralInvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralInvitationWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    employees: number
    jobPosts: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | CompanyCountOutputTypeCountEmployeesArgs
    jobPosts?: boolean | CompanyCountOutputTypeCountJobPostsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeProfileWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountJobPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobPostWhereInput
  }


  /**
   * Count Type JobPostCountOutputType
   */

  export type JobPostCountOutputType = {
    customFormFields: number
    applications: number
    referralInvitations: number
  }

  export type JobPostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customFormFields?: boolean | JobPostCountOutputTypeCountCustomFormFieldsArgs
    applications?: boolean | JobPostCountOutputTypeCountApplicationsArgs
    referralInvitations?: boolean | JobPostCountOutputTypeCountReferralInvitationsArgs
  }

  // Custom InputTypes
  /**
   * JobPostCountOutputType without action
   */
  export type JobPostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPostCountOutputType
     */
    select?: JobPostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobPostCountOutputType without action
   */
  export type JobPostCountOutputTypeCountCustomFormFieldsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobCustomFormFieldWhereInput
  }

  /**
   * JobPostCountOutputType without action
   */
  export type JobPostCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralApplicationWhereInput
  }

  /**
   * JobPostCountOutputType without action
   */
  export type JobPostCountOutputTypeCountReferralInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralInvitationWhereInput
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
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    welcomeEmailSent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    welcomeEmailSent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    resetPasswordToken: number
    resetPasswordExpires: number
    welcomeEmailSent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    welcomeEmailSent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    welcomeEmailSent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    welcomeEmailSent?: true
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
    email: string
    name: string
    password: string
    role: string | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    welcomeEmailSent: boolean
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
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    welcomeEmailSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employeeProfile?: boolean | User$employeeProfileArgs<ExtArgs>
    jobSeekerProfile?: boolean | User$jobSeekerProfileArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    jobPosts?: boolean | User$jobPostsArgs<ExtArgs>
    referralForm?: boolean | User$referralFormArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    receivedInvitations?: boolean | User$receivedInvitationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    welcomeEmailSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    welcomeEmailSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employeeProfile?: boolean | User$employeeProfileArgs<ExtArgs>
    jobSeekerProfile?: boolean | User$jobSeekerProfileArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    jobPosts?: boolean | User$jobPostsArgs<ExtArgs>
    referralForm?: boolean | User$referralFormArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    receivedInvitations?: boolean | User$receivedInvitationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      employeeProfile: Prisma.$EmployeeProfilePayload<ExtArgs> | null
      jobSeekerProfile: Prisma.$JobSeekerProfilePayload<ExtArgs> | null
      applications: Prisma.$ReferralApplicationPayload<ExtArgs>[]
      jobPosts: Prisma.$JobPostPayload<ExtArgs>[]
      referralForm: Prisma.$ReferralFormPayload<ExtArgs> | null
      sentInvitations: Prisma.$ReferralInvitationPayload<ExtArgs>[]
      receivedInvitations: Prisma.$ReferralInvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      role: string | null
      resetPasswordToken: string | null
      resetPasswordExpires: Date | null
      welcomeEmailSent: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employeeProfile<T extends User$employeeProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$employeeProfileArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    jobSeekerProfile<T extends User$jobSeekerProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$jobSeekerProfileArgs<ExtArgs>>): Prisma__JobSeekerProfileClient<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    applications<T extends User$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, User$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "findMany"> | Null>
    jobPosts<T extends User$jobPostsArgs<ExtArgs> = {}>(args?: Subset<T, User$jobPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findMany"> | Null>
    referralForm<T extends User$referralFormArgs<ExtArgs> = {}>(args?: Subset<T, User$referralFormArgs<ExtArgs>>): Prisma__ReferralFormClient<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    sentInvitations<T extends User$sentInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "findMany"> | Null>
    receivedInvitations<T extends User$receivedInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly resetPasswordToken: FieldRef<"User", 'String'>
    readonly resetPasswordExpires: FieldRef<"User", 'DateTime'>
    readonly welcomeEmailSent: FieldRef<"User", 'Boolean'>
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
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
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
  }

  /**
   * User.employeeProfile
   */
  export type User$employeeProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    where?: EmployeeProfileWhereInput
  }

  /**
   * User.jobSeekerProfile
   */
  export type User$jobSeekerProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    where?: JobSeekerProfileWhereInput
  }

  /**
   * User.applications
   */
  export type User$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    where?: ReferralApplicationWhereInput
    orderBy?: ReferralApplicationOrderByWithRelationInput | ReferralApplicationOrderByWithRelationInput[]
    cursor?: ReferralApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralApplicationScalarFieldEnum | ReferralApplicationScalarFieldEnum[]
  }

  /**
   * User.jobPosts
   */
  export type User$jobPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    where?: JobPostWhereInput
    orderBy?: JobPostOrderByWithRelationInput | JobPostOrderByWithRelationInput[]
    cursor?: JobPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobPostScalarFieldEnum | JobPostScalarFieldEnum[]
  }

  /**
   * User.referralForm
   */
  export type User$referralFormArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    where?: ReferralFormWhereInput
  }

  /**
   * User.sentInvitations
   */
  export type User$sentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    where?: ReferralInvitationWhereInput
    orderBy?: ReferralInvitationOrderByWithRelationInput | ReferralInvitationOrderByWithRelationInput[]
    cursor?: ReferralInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralInvitationScalarFieldEnum | ReferralInvitationScalarFieldEnum[]
  }

  /**
   * User.receivedInvitations
   */
  export type User$receivedInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    where?: ReferralInvitationWhereInput
    orderBy?: ReferralInvitationOrderByWithRelationInput | ReferralInvitationOrderByWithRelationInput[]
    cursor?: ReferralInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralInvitationScalarFieldEnum | ReferralInvitationScalarFieldEnum[]
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    logo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    logo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    description: number
    logo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    description: string | null
    logo: string | null
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employees?: boolean | Company$employeesArgs<ExtArgs>
    jobPosts?: boolean | Company$jobPostsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | Company$employeesArgs<ExtArgs>
    jobPosts?: boolean | Company$jobPostsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      employees: Prisma.$EmployeeProfilePayload<ExtArgs>[]
      jobPosts: Prisma.$JobPostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      logo: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
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
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employees<T extends Company$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Company$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findMany"> | Null>
    jobPosts<T extends Company$jobPostsArgs<ExtArgs> = {}>(args?: Subset<T, Company$jobPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Company model
   */ 
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly description: FieldRef<"Company", 'String'>
    readonly logo: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
  }

  /**
   * Company.employees
   */
  export type Company$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    where?: EmployeeProfileWhereInput
    orderBy?: EmployeeProfileOrderByWithRelationInput | EmployeeProfileOrderByWithRelationInput[]
    cursor?: EmployeeProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeProfileScalarFieldEnum | EmployeeProfileScalarFieldEnum[]
  }

  /**
   * Company.jobPosts
   */
  export type Company$jobPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    where?: JobPostWhereInput
    orderBy?: JobPostOrderByWithRelationInput | JobPostOrderByWithRelationInput[]
    cursor?: JobPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobPostScalarFieldEnum | JobPostScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeProfile
   */

  export type AggregateEmployeeProfile = {
    _count: EmployeeProfileCountAggregateOutputType | null
    _min: EmployeeProfileMinAggregateOutputType | null
    _max: EmployeeProfileMaxAggregateOutputType | null
  }

  export type EmployeeProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    companyId: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    companyId: string | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeProfileCountAggregateOutputType = {
    id: number
    userId: number
    companyId: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeProfileMinAggregateInputType = {
    id?: true
    userId?: true
    companyId?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    companyId?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeProfileCountAggregateInputType = {
    id?: true
    userId?: true
    companyId?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeProfile to aggregate.
     */
    where?: EmployeeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeProfiles to fetch.
     */
    orderBy?: EmployeeProfileOrderByWithRelationInput | EmployeeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeProfiles
    **/
    _count?: true | EmployeeProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeProfileMaxAggregateInputType
  }

  export type GetEmployeeProfileAggregateType<T extends EmployeeProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeProfile[P]>
      : GetScalarType<T[P], AggregateEmployeeProfile[P]>
  }




  export type EmployeeProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeProfileWhereInput
    orderBy?: EmployeeProfileOrderByWithAggregationInput | EmployeeProfileOrderByWithAggregationInput[]
    by: EmployeeProfileScalarFieldEnum[] | EmployeeProfileScalarFieldEnum
    having?: EmployeeProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeProfileCountAggregateInputType | true
    _min?: EmployeeProfileMinAggregateInputType
    _max?: EmployeeProfileMaxAggregateInputType
  }

  export type EmployeeProfileGroupByOutputType = {
    id: string
    userId: string
    companyId: string
    position: string | null
    createdAt: Date
    updatedAt: Date
    _count: EmployeeProfileCountAggregateOutputType | null
    _min: EmployeeProfileMinAggregateOutputType | null
    _max: EmployeeProfileMaxAggregateOutputType | null
  }

  type GetEmployeeProfileGroupByPayload<T extends EmployeeProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeProfileGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeProfileGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyId?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeProfile"]>

  export type EmployeeProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyId?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeProfile"]>

  export type EmployeeProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    companyId?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type EmployeeProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $EmployeeProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      companyId: string
      position: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employeeProfile"]>
    composites: {}
  }

  type EmployeeProfileGetPayload<S extends boolean | null | undefined | EmployeeProfileDefaultArgs> = $Result.GetResult<Prisma.$EmployeeProfilePayload, S>

  type EmployeeProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmployeeProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmployeeProfileCountAggregateInputType | true
    }

  export interface EmployeeProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeProfile'], meta: { name: 'EmployeeProfile' } }
    /**
     * Find zero or one EmployeeProfile that matches the filter.
     * @param {EmployeeProfileFindUniqueArgs} args - Arguments to find a EmployeeProfile
     * @example
     * // Get one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeProfileFindUniqueArgs>(args: SelectSubset<T, EmployeeProfileFindUniqueArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EmployeeProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EmployeeProfileFindUniqueOrThrowArgs} args - Arguments to find a EmployeeProfile
     * @example
     * // Get one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EmployeeProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileFindFirstArgs} args - Arguments to find a EmployeeProfile
     * @example
     * // Get one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeProfileFindFirstArgs>(args?: SelectSubset<T, EmployeeProfileFindFirstArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EmployeeProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileFindFirstOrThrowArgs} args - Arguments to find a EmployeeProfile
     * @example
     * // Get one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EmployeeProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeProfiles
     * const employeeProfiles = await prisma.employeeProfile.findMany()
     * 
     * // Get first 10 EmployeeProfiles
     * const employeeProfiles = await prisma.employeeProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeProfileWithIdOnly = await prisma.employeeProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeProfileFindManyArgs>(args?: SelectSubset<T, EmployeeProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EmployeeProfile.
     * @param {EmployeeProfileCreateArgs} args - Arguments to create a EmployeeProfile.
     * @example
     * // Create one EmployeeProfile
     * const EmployeeProfile = await prisma.employeeProfile.create({
     *   data: {
     *     // ... data to create a EmployeeProfile
     *   }
     * })
     * 
     */
    create<T extends EmployeeProfileCreateArgs>(args: SelectSubset<T, EmployeeProfileCreateArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EmployeeProfiles.
     * @param {EmployeeProfileCreateManyArgs} args - Arguments to create many EmployeeProfiles.
     * @example
     * // Create many EmployeeProfiles
     * const employeeProfile = await prisma.employeeProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeProfileCreateManyArgs>(args?: SelectSubset<T, EmployeeProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeProfiles and returns the data saved in the database.
     * @param {EmployeeProfileCreateManyAndReturnArgs} args - Arguments to create many EmployeeProfiles.
     * @example
     * // Create many EmployeeProfiles
     * const employeeProfile = await prisma.employeeProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeProfiles and only return the `id`
     * const employeeProfileWithIdOnly = await prisma.employeeProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EmployeeProfile.
     * @param {EmployeeProfileDeleteArgs} args - Arguments to delete one EmployeeProfile.
     * @example
     * // Delete one EmployeeProfile
     * const EmployeeProfile = await prisma.employeeProfile.delete({
     *   where: {
     *     // ... filter to delete one EmployeeProfile
     *   }
     * })
     * 
     */
    delete<T extends EmployeeProfileDeleteArgs>(args: SelectSubset<T, EmployeeProfileDeleteArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EmployeeProfile.
     * @param {EmployeeProfileUpdateArgs} args - Arguments to update one EmployeeProfile.
     * @example
     * // Update one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeProfileUpdateArgs>(args: SelectSubset<T, EmployeeProfileUpdateArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EmployeeProfiles.
     * @param {EmployeeProfileDeleteManyArgs} args - Arguments to filter EmployeeProfiles to delete.
     * @example
     * // Delete a few EmployeeProfiles
     * const { count } = await prisma.employeeProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeProfileDeleteManyArgs>(args?: SelectSubset<T, EmployeeProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeProfiles
     * const employeeProfile = await prisma.employeeProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeProfileUpdateManyArgs>(args: SelectSubset<T, EmployeeProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmployeeProfile.
     * @param {EmployeeProfileUpsertArgs} args - Arguments to update or create a EmployeeProfile.
     * @example
     * // Update or create a EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.upsert({
     *   create: {
     *     // ... data to create a EmployeeProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeProfile we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeProfileUpsertArgs>(args: SelectSubset<T, EmployeeProfileUpsertArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EmployeeProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileCountArgs} args - Arguments to filter EmployeeProfiles to count.
     * @example
     * // Count the number of EmployeeProfiles
     * const count = await prisma.employeeProfile.count({
     *   where: {
     *     // ... the filter for the EmployeeProfiles we want to count
     *   }
     * })
    **/
    count<T extends EmployeeProfileCountArgs>(
      args?: Subset<T, EmployeeProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeProfileAggregateArgs>(args: Subset<T, EmployeeProfileAggregateArgs>): Prisma.PrismaPromise<GetEmployeeProfileAggregateType<T>>

    /**
     * Group by EmployeeProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileGroupByArgs} args - Group by arguments.
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
      T extends EmployeeProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeProfileGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeeProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeProfile model
   */
  readonly fields: EmployeeProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the EmployeeProfile model
   */ 
  interface EmployeeProfileFieldRefs {
    readonly id: FieldRef<"EmployeeProfile", 'String'>
    readonly userId: FieldRef<"EmployeeProfile", 'String'>
    readonly companyId: FieldRef<"EmployeeProfile", 'String'>
    readonly position: FieldRef<"EmployeeProfile", 'String'>
    readonly createdAt: FieldRef<"EmployeeProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"EmployeeProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeProfile findUnique
   */
  export type EmployeeProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfile to fetch.
     */
    where: EmployeeProfileWhereUniqueInput
  }

  /**
   * EmployeeProfile findUniqueOrThrow
   */
  export type EmployeeProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfile to fetch.
     */
    where: EmployeeProfileWhereUniqueInput
  }

  /**
   * EmployeeProfile findFirst
   */
  export type EmployeeProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfile to fetch.
     */
    where?: EmployeeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeProfiles to fetch.
     */
    orderBy?: EmployeeProfileOrderByWithRelationInput | EmployeeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeProfiles.
     */
    cursor?: EmployeeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeProfiles.
     */
    distinct?: EmployeeProfileScalarFieldEnum | EmployeeProfileScalarFieldEnum[]
  }

  /**
   * EmployeeProfile findFirstOrThrow
   */
  export type EmployeeProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfile to fetch.
     */
    where?: EmployeeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeProfiles to fetch.
     */
    orderBy?: EmployeeProfileOrderByWithRelationInput | EmployeeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeProfiles.
     */
    cursor?: EmployeeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeProfiles.
     */
    distinct?: EmployeeProfileScalarFieldEnum | EmployeeProfileScalarFieldEnum[]
  }

  /**
   * EmployeeProfile findMany
   */
  export type EmployeeProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfiles to fetch.
     */
    where?: EmployeeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeProfiles to fetch.
     */
    orderBy?: EmployeeProfileOrderByWithRelationInput | EmployeeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeProfiles.
     */
    cursor?: EmployeeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeProfiles.
     */
    skip?: number
    distinct?: EmployeeProfileScalarFieldEnum | EmployeeProfileScalarFieldEnum[]
  }

  /**
   * EmployeeProfile create
   */
  export type EmployeeProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeProfile.
     */
    data: XOR<EmployeeProfileCreateInput, EmployeeProfileUncheckedCreateInput>
  }

  /**
   * EmployeeProfile createMany
   */
  export type EmployeeProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeProfiles.
     */
    data: EmployeeProfileCreateManyInput | EmployeeProfileCreateManyInput[]
  }

  /**
   * EmployeeProfile createManyAndReturn
   */
  export type EmployeeProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EmployeeProfiles.
     */
    data: EmployeeProfileCreateManyInput | EmployeeProfileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeProfile update
   */
  export type EmployeeProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeProfile.
     */
    data: XOR<EmployeeProfileUpdateInput, EmployeeProfileUncheckedUpdateInput>
    /**
     * Choose, which EmployeeProfile to update.
     */
    where: EmployeeProfileWhereUniqueInput
  }

  /**
   * EmployeeProfile updateMany
   */
  export type EmployeeProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeProfiles.
     */
    data: XOR<EmployeeProfileUpdateManyMutationInput, EmployeeProfileUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeProfiles to update
     */
    where?: EmployeeProfileWhereInput
  }

  /**
   * EmployeeProfile upsert
   */
  export type EmployeeProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeProfile to update in case it exists.
     */
    where: EmployeeProfileWhereUniqueInput
    /**
     * In case the EmployeeProfile found by the `where` argument doesn't exist, create a new EmployeeProfile with this data.
     */
    create: XOR<EmployeeProfileCreateInput, EmployeeProfileUncheckedCreateInput>
    /**
     * In case the EmployeeProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeProfileUpdateInput, EmployeeProfileUncheckedUpdateInput>
  }

  /**
   * EmployeeProfile delete
   */
  export type EmployeeProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter which EmployeeProfile to delete.
     */
    where: EmployeeProfileWhereUniqueInput
  }

  /**
   * EmployeeProfile deleteMany
   */
  export type EmployeeProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeProfiles to delete
     */
    where?: EmployeeProfileWhereInput
  }

  /**
   * EmployeeProfile without action
   */
  export type EmployeeProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
  }


  /**
   * Model JobPost
   */

  export type AggregateJobPost = {
    _count: JobPostCountAggregateOutputType | null
    _avg: JobPostAvgAggregateOutputType | null
    _sum: JobPostSumAggregateOutputType | null
    _min: JobPostMinAggregateOutputType | null
    _max: JobPostMaxAggregateOutputType | null
  }

  export type JobPostAvgAggregateOutputType = {
    experience: number | null
  }

  export type JobPostSumAggregateOutputType = {
    experience: number | null
  }

  export type JobPostMinAggregateOutputType = {
    id: string | null
    title: string | null
    companyName: string | null
    description: string | null
    experience: number | null
    location: string | null
    skills: string | null
    companyId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobPostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    companyName: string | null
    description: string | null
    experience: number | null
    location: string | null
    skills: string | null
    companyId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobPostCountAggregateOutputType = {
    id: number
    title: number
    companyName: number
    description: number
    experience: number
    location: number
    skills: number
    companyId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobPostAvgAggregateInputType = {
    experience?: true
  }

  export type JobPostSumAggregateInputType = {
    experience?: true
  }

  export type JobPostMinAggregateInputType = {
    id?: true
    title?: true
    companyName?: true
    description?: true
    experience?: true
    location?: true
    skills?: true
    companyId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobPostMaxAggregateInputType = {
    id?: true
    title?: true
    companyName?: true
    description?: true
    experience?: true
    location?: true
    skills?: true
    companyId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobPostCountAggregateInputType = {
    id?: true
    title?: true
    companyName?: true
    description?: true
    experience?: true
    location?: true
    skills?: true
    companyId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPost to aggregate.
     */
    where?: JobPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPosts to fetch.
     */
    orderBy?: JobPostOrderByWithRelationInput | JobPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobPosts
    **/
    _count?: true | JobPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobPostMaxAggregateInputType
  }

  export type GetJobPostAggregateType<T extends JobPostAggregateArgs> = {
        [P in keyof T & keyof AggregateJobPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobPost[P]>
      : GetScalarType<T[P], AggregateJobPost[P]>
  }




  export type JobPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobPostWhereInput
    orderBy?: JobPostOrderByWithAggregationInput | JobPostOrderByWithAggregationInput[]
    by: JobPostScalarFieldEnum[] | JobPostScalarFieldEnum
    having?: JobPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobPostCountAggregateInputType | true
    _avg?: JobPostAvgAggregateInputType
    _sum?: JobPostSumAggregateInputType
    _min?: JobPostMinAggregateInputType
    _max?: JobPostMaxAggregateInputType
  }

  export type JobPostGroupByOutputType = {
    id: string
    title: string
    companyName: string
    description: string | null
    experience: number | null
    location: string | null
    skills: string | null
    companyId: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: JobPostCountAggregateOutputType | null
    _avg: JobPostAvgAggregateOutputType | null
    _sum: JobPostSumAggregateOutputType | null
    _min: JobPostMinAggregateOutputType | null
    _max: JobPostMaxAggregateOutputType | null
  }

  type GetJobPostGroupByPayload<T extends JobPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobPostGroupByOutputType[P]>
            : GetScalarType<T[P], JobPostGroupByOutputType[P]>
        }
      >
    >


  export type JobPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    companyName?: boolean
    description?: boolean
    experience?: boolean
    location?: boolean
    skills?: boolean
    companyId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    customFormFields?: boolean | JobPost$customFormFieldsArgs<ExtArgs>
    applications?: boolean | JobPost$applicationsArgs<ExtArgs>
    referralInvitations?: boolean | JobPost$referralInvitationsArgs<ExtArgs>
    _count?: boolean | JobPostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobPost"]>

  export type JobPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    companyName?: boolean
    description?: boolean
    experience?: boolean
    location?: boolean
    skills?: boolean
    companyId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobPost"]>

  export type JobPostSelectScalar = {
    id?: boolean
    title?: boolean
    companyName?: boolean
    description?: boolean
    experience?: boolean
    location?: boolean
    skills?: boolean
    companyId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    customFormFields?: boolean | JobPost$customFormFieldsArgs<ExtArgs>
    applications?: boolean | JobPost$applicationsArgs<ExtArgs>
    referralInvitations?: boolean | JobPost$referralInvitationsArgs<ExtArgs>
    _count?: boolean | JobPostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobPostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JobPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobPost"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      customFormFields: Prisma.$JobCustomFormFieldPayload<ExtArgs>[]
      applications: Prisma.$ReferralApplicationPayload<ExtArgs>[]
      referralInvitations: Prisma.$ReferralInvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      companyName: string
      description: string | null
      experience: number | null
      location: string | null
      skills: string | null
      companyId: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jobPost"]>
    composites: {}
  }

  type JobPostGetPayload<S extends boolean | null | undefined | JobPostDefaultArgs> = $Result.GetResult<Prisma.$JobPostPayload, S>

  type JobPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobPostFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobPostCountAggregateInputType | true
    }

  export interface JobPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobPost'], meta: { name: 'JobPost' } }
    /**
     * Find zero or one JobPost that matches the filter.
     * @param {JobPostFindUniqueArgs} args - Arguments to find a JobPost
     * @example
     * // Get one JobPost
     * const jobPost = await prisma.jobPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobPostFindUniqueArgs>(args: SelectSubset<T, JobPostFindUniqueArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JobPost that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobPostFindUniqueOrThrowArgs} args - Arguments to find a JobPost
     * @example
     * // Get one JobPost
     * const jobPost = await prisma.jobPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobPostFindUniqueOrThrowArgs>(args: SelectSubset<T, JobPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JobPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostFindFirstArgs} args - Arguments to find a JobPost
     * @example
     * // Get one JobPost
     * const jobPost = await prisma.jobPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobPostFindFirstArgs>(args?: SelectSubset<T, JobPostFindFirstArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JobPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostFindFirstOrThrowArgs} args - Arguments to find a JobPost
     * @example
     * // Get one JobPost
     * const jobPost = await prisma.jobPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobPostFindFirstOrThrowArgs>(args?: SelectSubset<T, JobPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JobPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobPosts
     * const jobPosts = await prisma.jobPost.findMany()
     * 
     * // Get first 10 JobPosts
     * const jobPosts = await prisma.jobPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobPostWithIdOnly = await prisma.jobPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobPostFindManyArgs>(args?: SelectSubset<T, JobPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JobPost.
     * @param {JobPostCreateArgs} args - Arguments to create a JobPost.
     * @example
     * // Create one JobPost
     * const JobPost = await prisma.jobPost.create({
     *   data: {
     *     // ... data to create a JobPost
     *   }
     * })
     * 
     */
    create<T extends JobPostCreateArgs>(args: SelectSubset<T, JobPostCreateArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JobPosts.
     * @param {JobPostCreateManyArgs} args - Arguments to create many JobPosts.
     * @example
     * // Create many JobPosts
     * const jobPost = await prisma.jobPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobPostCreateManyArgs>(args?: SelectSubset<T, JobPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobPosts and returns the data saved in the database.
     * @param {JobPostCreateManyAndReturnArgs} args - Arguments to create many JobPosts.
     * @example
     * // Create many JobPosts
     * const jobPost = await prisma.jobPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobPosts and only return the `id`
     * const jobPostWithIdOnly = await prisma.jobPost.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobPostCreateManyAndReturnArgs>(args?: SelectSubset<T, JobPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JobPost.
     * @param {JobPostDeleteArgs} args - Arguments to delete one JobPost.
     * @example
     * // Delete one JobPost
     * const JobPost = await prisma.jobPost.delete({
     *   where: {
     *     // ... filter to delete one JobPost
     *   }
     * })
     * 
     */
    delete<T extends JobPostDeleteArgs>(args: SelectSubset<T, JobPostDeleteArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JobPost.
     * @param {JobPostUpdateArgs} args - Arguments to update one JobPost.
     * @example
     * // Update one JobPost
     * const jobPost = await prisma.jobPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobPostUpdateArgs>(args: SelectSubset<T, JobPostUpdateArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JobPosts.
     * @param {JobPostDeleteManyArgs} args - Arguments to filter JobPosts to delete.
     * @example
     * // Delete a few JobPosts
     * const { count } = await prisma.jobPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobPostDeleteManyArgs>(args?: SelectSubset<T, JobPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobPosts
     * const jobPost = await prisma.jobPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobPostUpdateManyArgs>(args: SelectSubset<T, JobPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobPost.
     * @param {JobPostUpsertArgs} args - Arguments to update or create a JobPost.
     * @example
     * // Update or create a JobPost
     * const jobPost = await prisma.jobPost.upsert({
     *   create: {
     *     // ... data to create a JobPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobPost we want to update
     *   }
     * })
     */
    upsert<T extends JobPostUpsertArgs>(args: SelectSubset<T, JobPostUpsertArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JobPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostCountArgs} args - Arguments to filter JobPosts to count.
     * @example
     * // Count the number of JobPosts
     * const count = await prisma.jobPost.count({
     *   where: {
     *     // ... the filter for the JobPosts we want to count
     *   }
     * })
    **/
    count<T extends JobPostCountArgs>(
      args?: Subset<T, JobPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobPostAggregateArgs>(args: Subset<T, JobPostAggregateArgs>): Prisma.PrismaPromise<GetJobPostAggregateType<T>>

    /**
     * Group by JobPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostGroupByArgs} args - Group by arguments.
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
      T extends JobPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobPostGroupByArgs['orderBy'] }
        : { orderBy?: JobPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobPost model
   */
  readonly fields: JobPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    customFormFields<T extends JobPost$customFormFieldsArgs<ExtArgs> = {}>(args?: Subset<T, JobPost$customFormFieldsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "findMany"> | Null>
    applications<T extends JobPost$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, JobPost$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "findMany"> | Null>
    referralInvitations<T extends JobPost$referralInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, JobPost$referralInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the JobPost model
   */ 
  interface JobPostFieldRefs {
    readonly id: FieldRef<"JobPost", 'String'>
    readonly title: FieldRef<"JobPost", 'String'>
    readonly companyName: FieldRef<"JobPost", 'String'>
    readonly description: FieldRef<"JobPost", 'String'>
    readonly experience: FieldRef<"JobPost", 'Int'>
    readonly location: FieldRef<"JobPost", 'String'>
    readonly skills: FieldRef<"JobPost", 'String'>
    readonly companyId: FieldRef<"JobPost", 'String'>
    readonly userId: FieldRef<"JobPost", 'String'>
    readonly createdAt: FieldRef<"JobPost", 'DateTime'>
    readonly updatedAt: FieldRef<"JobPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobPost findUnique
   */
  export type JobPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    /**
     * Filter, which JobPost to fetch.
     */
    where: JobPostWhereUniqueInput
  }

  /**
   * JobPost findUniqueOrThrow
   */
  export type JobPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    /**
     * Filter, which JobPost to fetch.
     */
    where: JobPostWhereUniqueInput
  }

  /**
   * JobPost findFirst
   */
  export type JobPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    /**
     * Filter, which JobPost to fetch.
     */
    where?: JobPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPosts to fetch.
     */
    orderBy?: JobPostOrderByWithRelationInput | JobPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPosts.
     */
    cursor?: JobPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPosts.
     */
    distinct?: JobPostScalarFieldEnum | JobPostScalarFieldEnum[]
  }

  /**
   * JobPost findFirstOrThrow
   */
  export type JobPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    /**
     * Filter, which JobPost to fetch.
     */
    where?: JobPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPosts to fetch.
     */
    orderBy?: JobPostOrderByWithRelationInput | JobPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPosts.
     */
    cursor?: JobPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPosts.
     */
    distinct?: JobPostScalarFieldEnum | JobPostScalarFieldEnum[]
  }

  /**
   * JobPost findMany
   */
  export type JobPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    /**
     * Filter, which JobPosts to fetch.
     */
    where?: JobPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPosts to fetch.
     */
    orderBy?: JobPostOrderByWithRelationInput | JobPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobPosts.
     */
    cursor?: JobPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPosts.
     */
    skip?: number
    distinct?: JobPostScalarFieldEnum | JobPostScalarFieldEnum[]
  }

  /**
   * JobPost create
   */
  export type JobPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    /**
     * The data needed to create a JobPost.
     */
    data: XOR<JobPostCreateInput, JobPostUncheckedCreateInput>
  }

  /**
   * JobPost createMany
   */
  export type JobPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobPosts.
     */
    data: JobPostCreateManyInput | JobPostCreateManyInput[]
  }

  /**
   * JobPost createManyAndReturn
   */
  export type JobPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JobPosts.
     */
    data: JobPostCreateManyInput | JobPostCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobPost update
   */
  export type JobPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    /**
     * The data needed to update a JobPost.
     */
    data: XOR<JobPostUpdateInput, JobPostUncheckedUpdateInput>
    /**
     * Choose, which JobPost to update.
     */
    where: JobPostWhereUniqueInput
  }

  /**
   * JobPost updateMany
   */
  export type JobPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobPosts.
     */
    data: XOR<JobPostUpdateManyMutationInput, JobPostUncheckedUpdateManyInput>
    /**
     * Filter which JobPosts to update
     */
    where?: JobPostWhereInput
  }

  /**
   * JobPost upsert
   */
  export type JobPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    /**
     * The filter to search for the JobPost to update in case it exists.
     */
    where: JobPostWhereUniqueInput
    /**
     * In case the JobPost found by the `where` argument doesn't exist, create a new JobPost with this data.
     */
    create: XOR<JobPostCreateInput, JobPostUncheckedCreateInput>
    /**
     * In case the JobPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobPostUpdateInput, JobPostUncheckedUpdateInput>
  }

  /**
   * JobPost delete
   */
  export type JobPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    /**
     * Filter which JobPost to delete.
     */
    where: JobPostWhereUniqueInput
  }

  /**
   * JobPost deleteMany
   */
  export type JobPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPosts to delete
     */
    where?: JobPostWhereInput
  }

  /**
   * JobPost.customFormFields
   */
  export type JobPost$customFormFieldsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    where?: JobCustomFormFieldWhereInput
    orderBy?: JobCustomFormFieldOrderByWithRelationInput | JobCustomFormFieldOrderByWithRelationInput[]
    cursor?: JobCustomFormFieldWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobCustomFormFieldScalarFieldEnum | JobCustomFormFieldScalarFieldEnum[]
  }

  /**
   * JobPost.applications
   */
  export type JobPost$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    where?: ReferralApplicationWhereInput
    orderBy?: ReferralApplicationOrderByWithRelationInput | ReferralApplicationOrderByWithRelationInput[]
    cursor?: ReferralApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralApplicationScalarFieldEnum | ReferralApplicationScalarFieldEnum[]
  }

  /**
   * JobPost.referralInvitations
   */
  export type JobPost$referralInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    where?: ReferralInvitationWhereInput
    orderBy?: ReferralInvitationOrderByWithRelationInput | ReferralInvitationOrderByWithRelationInput[]
    cursor?: ReferralInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralInvitationScalarFieldEnum | ReferralInvitationScalarFieldEnum[]
  }

  /**
   * JobPost without action
   */
  export type JobPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
  }


  /**
   * Model JobCustomFormField
   */

  export type AggregateJobCustomFormField = {
    _count: JobCustomFormFieldCountAggregateOutputType | null
    _avg: JobCustomFormFieldAvgAggregateOutputType | null
    _sum: JobCustomFormFieldSumAggregateOutputType | null
    _min: JobCustomFormFieldMinAggregateOutputType | null
    _max: JobCustomFormFieldMaxAggregateOutputType | null
  }

  export type JobCustomFormFieldAvgAggregateOutputType = {
    order: number | null
  }

  export type JobCustomFormFieldSumAggregateOutputType = {
    order: number | null
  }

  export type JobCustomFormFieldMinAggregateOutputType = {
    id: string | null
    jobPostId: string | null
    label: string | null
    type: string | null
    required: boolean | null
    order: number | null
  }

  export type JobCustomFormFieldMaxAggregateOutputType = {
    id: string | null
    jobPostId: string | null
    label: string | null
    type: string | null
    required: boolean | null
    order: number | null
  }

  export type JobCustomFormFieldCountAggregateOutputType = {
    id: number
    jobPostId: number
    label: number
    type: number
    required: number
    order: number
    _all: number
  }


  export type JobCustomFormFieldAvgAggregateInputType = {
    order?: true
  }

  export type JobCustomFormFieldSumAggregateInputType = {
    order?: true
  }

  export type JobCustomFormFieldMinAggregateInputType = {
    id?: true
    jobPostId?: true
    label?: true
    type?: true
    required?: true
    order?: true
  }

  export type JobCustomFormFieldMaxAggregateInputType = {
    id?: true
    jobPostId?: true
    label?: true
    type?: true
    required?: true
    order?: true
  }

  export type JobCustomFormFieldCountAggregateInputType = {
    id?: true
    jobPostId?: true
    label?: true
    type?: true
    required?: true
    order?: true
    _all?: true
  }

  export type JobCustomFormFieldAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobCustomFormField to aggregate.
     */
    where?: JobCustomFormFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobCustomFormFields to fetch.
     */
    orderBy?: JobCustomFormFieldOrderByWithRelationInput | JobCustomFormFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobCustomFormFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobCustomFormFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobCustomFormFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobCustomFormFields
    **/
    _count?: true | JobCustomFormFieldCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobCustomFormFieldAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobCustomFormFieldSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobCustomFormFieldMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobCustomFormFieldMaxAggregateInputType
  }

  export type GetJobCustomFormFieldAggregateType<T extends JobCustomFormFieldAggregateArgs> = {
        [P in keyof T & keyof AggregateJobCustomFormField]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobCustomFormField[P]>
      : GetScalarType<T[P], AggregateJobCustomFormField[P]>
  }




  export type JobCustomFormFieldGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobCustomFormFieldWhereInput
    orderBy?: JobCustomFormFieldOrderByWithAggregationInput | JobCustomFormFieldOrderByWithAggregationInput[]
    by: JobCustomFormFieldScalarFieldEnum[] | JobCustomFormFieldScalarFieldEnum
    having?: JobCustomFormFieldScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCustomFormFieldCountAggregateInputType | true
    _avg?: JobCustomFormFieldAvgAggregateInputType
    _sum?: JobCustomFormFieldSumAggregateInputType
    _min?: JobCustomFormFieldMinAggregateInputType
    _max?: JobCustomFormFieldMaxAggregateInputType
  }

  export type JobCustomFormFieldGroupByOutputType = {
    id: string
    jobPostId: string
    label: string
    type: string
    required: boolean
    order: number
    _count: JobCustomFormFieldCountAggregateOutputType | null
    _avg: JobCustomFormFieldAvgAggregateOutputType | null
    _sum: JobCustomFormFieldSumAggregateOutputType | null
    _min: JobCustomFormFieldMinAggregateOutputType | null
    _max: JobCustomFormFieldMaxAggregateOutputType | null
  }

  type GetJobCustomFormFieldGroupByPayload<T extends JobCustomFormFieldGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobCustomFormFieldGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobCustomFormFieldGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobCustomFormFieldGroupByOutputType[P]>
            : GetScalarType<T[P], JobCustomFormFieldGroupByOutputType[P]>
        }
      >
    >


  export type JobCustomFormFieldSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobPostId?: boolean
    label?: boolean
    type?: boolean
    required?: boolean
    order?: boolean
    jobPost?: boolean | JobPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobCustomFormField"]>

  export type JobCustomFormFieldSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobPostId?: boolean
    label?: boolean
    type?: boolean
    required?: boolean
    order?: boolean
    jobPost?: boolean | JobPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobCustomFormField"]>

  export type JobCustomFormFieldSelectScalar = {
    id?: boolean
    jobPostId?: boolean
    label?: boolean
    type?: boolean
    required?: boolean
    order?: boolean
  }

  export type JobCustomFormFieldInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobPost?: boolean | JobPostDefaultArgs<ExtArgs>
  }
  export type JobCustomFormFieldIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobPost?: boolean | JobPostDefaultArgs<ExtArgs>
  }

  export type $JobCustomFormFieldPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobCustomFormField"
    objects: {
      jobPost: Prisma.$JobPostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobPostId: string
      label: string
      type: string
      required: boolean
      order: number
    }, ExtArgs["result"]["jobCustomFormField"]>
    composites: {}
  }

  type JobCustomFormFieldGetPayload<S extends boolean | null | undefined | JobCustomFormFieldDefaultArgs> = $Result.GetResult<Prisma.$JobCustomFormFieldPayload, S>

  type JobCustomFormFieldCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobCustomFormFieldFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobCustomFormFieldCountAggregateInputType | true
    }

  export interface JobCustomFormFieldDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobCustomFormField'], meta: { name: 'JobCustomFormField' } }
    /**
     * Find zero or one JobCustomFormField that matches the filter.
     * @param {JobCustomFormFieldFindUniqueArgs} args - Arguments to find a JobCustomFormField
     * @example
     * // Get one JobCustomFormField
     * const jobCustomFormField = await prisma.jobCustomFormField.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobCustomFormFieldFindUniqueArgs>(args: SelectSubset<T, JobCustomFormFieldFindUniqueArgs<ExtArgs>>): Prisma__JobCustomFormFieldClient<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JobCustomFormField that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobCustomFormFieldFindUniqueOrThrowArgs} args - Arguments to find a JobCustomFormField
     * @example
     * // Get one JobCustomFormField
     * const jobCustomFormField = await prisma.jobCustomFormField.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobCustomFormFieldFindUniqueOrThrowArgs>(args: SelectSubset<T, JobCustomFormFieldFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobCustomFormFieldClient<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JobCustomFormField that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCustomFormFieldFindFirstArgs} args - Arguments to find a JobCustomFormField
     * @example
     * // Get one JobCustomFormField
     * const jobCustomFormField = await prisma.jobCustomFormField.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobCustomFormFieldFindFirstArgs>(args?: SelectSubset<T, JobCustomFormFieldFindFirstArgs<ExtArgs>>): Prisma__JobCustomFormFieldClient<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JobCustomFormField that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCustomFormFieldFindFirstOrThrowArgs} args - Arguments to find a JobCustomFormField
     * @example
     * // Get one JobCustomFormField
     * const jobCustomFormField = await prisma.jobCustomFormField.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobCustomFormFieldFindFirstOrThrowArgs>(args?: SelectSubset<T, JobCustomFormFieldFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobCustomFormFieldClient<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JobCustomFormFields that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCustomFormFieldFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobCustomFormFields
     * const jobCustomFormFields = await prisma.jobCustomFormField.findMany()
     * 
     * // Get first 10 JobCustomFormFields
     * const jobCustomFormFields = await prisma.jobCustomFormField.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobCustomFormFieldWithIdOnly = await prisma.jobCustomFormField.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobCustomFormFieldFindManyArgs>(args?: SelectSubset<T, JobCustomFormFieldFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JobCustomFormField.
     * @param {JobCustomFormFieldCreateArgs} args - Arguments to create a JobCustomFormField.
     * @example
     * // Create one JobCustomFormField
     * const JobCustomFormField = await prisma.jobCustomFormField.create({
     *   data: {
     *     // ... data to create a JobCustomFormField
     *   }
     * })
     * 
     */
    create<T extends JobCustomFormFieldCreateArgs>(args: SelectSubset<T, JobCustomFormFieldCreateArgs<ExtArgs>>): Prisma__JobCustomFormFieldClient<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JobCustomFormFields.
     * @param {JobCustomFormFieldCreateManyArgs} args - Arguments to create many JobCustomFormFields.
     * @example
     * // Create many JobCustomFormFields
     * const jobCustomFormField = await prisma.jobCustomFormField.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCustomFormFieldCreateManyArgs>(args?: SelectSubset<T, JobCustomFormFieldCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobCustomFormFields and returns the data saved in the database.
     * @param {JobCustomFormFieldCreateManyAndReturnArgs} args - Arguments to create many JobCustomFormFields.
     * @example
     * // Create many JobCustomFormFields
     * const jobCustomFormField = await prisma.jobCustomFormField.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobCustomFormFields and only return the `id`
     * const jobCustomFormFieldWithIdOnly = await prisma.jobCustomFormField.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCustomFormFieldCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCustomFormFieldCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JobCustomFormField.
     * @param {JobCustomFormFieldDeleteArgs} args - Arguments to delete one JobCustomFormField.
     * @example
     * // Delete one JobCustomFormField
     * const JobCustomFormField = await prisma.jobCustomFormField.delete({
     *   where: {
     *     // ... filter to delete one JobCustomFormField
     *   }
     * })
     * 
     */
    delete<T extends JobCustomFormFieldDeleteArgs>(args: SelectSubset<T, JobCustomFormFieldDeleteArgs<ExtArgs>>): Prisma__JobCustomFormFieldClient<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JobCustomFormField.
     * @param {JobCustomFormFieldUpdateArgs} args - Arguments to update one JobCustomFormField.
     * @example
     * // Update one JobCustomFormField
     * const jobCustomFormField = await prisma.jobCustomFormField.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobCustomFormFieldUpdateArgs>(args: SelectSubset<T, JobCustomFormFieldUpdateArgs<ExtArgs>>): Prisma__JobCustomFormFieldClient<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JobCustomFormFields.
     * @param {JobCustomFormFieldDeleteManyArgs} args - Arguments to filter JobCustomFormFields to delete.
     * @example
     * // Delete a few JobCustomFormFields
     * const { count } = await prisma.jobCustomFormField.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobCustomFormFieldDeleteManyArgs>(args?: SelectSubset<T, JobCustomFormFieldDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobCustomFormFields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCustomFormFieldUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobCustomFormFields
     * const jobCustomFormField = await prisma.jobCustomFormField.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobCustomFormFieldUpdateManyArgs>(args: SelectSubset<T, JobCustomFormFieldUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobCustomFormField.
     * @param {JobCustomFormFieldUpsertArgs} args - Arguments to update or create a JobCustomFormField.
     * @example
     * // Update or create a JobCustomFormField
     * const jobCustomFormField = await prisma.jobCustomFormField.upsert({
     *   create: {
     *     // ... data to create a JobCustomFormField
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobCustomFormField we want to update
     *   }
     * })
     */
    upsert<T extends JobCustomFormFieldUpsertArgs>(args: SelectSubset<T, JobCustomFormFieldUpsertArgs<ExtArgs>>): Prisma__JobCustomFormFieldClient<$Result.GetResult<Prisma.$JobCustomFormFieldPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JobCustomFormFields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCustomFormFieldCountArgs} args - Arguments to filter JobCustomFormFields to count.
     * @example
     * // Count the number of JobCustomFormFields
     * const count = await prisma.jobCustomFormField.count({
     *   where: {
     *     // ... the filter for the JobCustomFormFields we want to count
     *   }
     * })
    **/
    count<T extends JobCustomFormFieldCountArgs>(
      args?: Subset<T, JobCustomFormFieldCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCustomFormFieldCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobCustomFormField.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCustomFormFieldAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobCustomFormFieldAggregateArgs>(args: Subset<T, JobCustomFormFieldAggregateArgs>): Prisma.PrismaPromise<GetJobCustomFormFieldAggregateType<T>>

    /**
     * Group by JobCustomFormField.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCustomFormFieldGroupByArgs} args - Group by arguments.
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
      T extends JobCustomFormFieldGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobCustomFormFieldGroupByArgs['orderBy'] }
        : { orderBy?: JobCustomFormFieldGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobCustomFormFieldGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobCustomFormFieldGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobCustomFormField model
   */
  readonly fields: JobCustomFormFieldFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobCustomFormField.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobCustomFormFieldClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobPost<T extends JobPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobPostDefaultArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the JobCustomFormField model
   */ 
  interface JobCustomFormFieldFieldRefs {
    readonly id: FieldRef<"JobCustomFormField", 'String'>
    readonly jobPostId: FieldRef<"JobCustomFormField", 'String'>
    readonly label: FieldRef<"JobCustomFormField", 'String'>
    readonly type: FieldRef<"JobCustomFormField", 'String'>
    readonly required: FieldRef<"JobCustomFormField", 'Boolean'>
    readonly order: FieldRef<"JobCustomFormField", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * JobCustomFormField findUnique
   */
  export type JobCustomFormFieldFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    /**
     * Filter, which JobCustomFormField to fetch.
     */
    where: JobCustomFormFieldWhereUniqueInput
  }

  /**
   * JobCustomFormField findUniqueOrThrow
   */
  export type JobCustomFormFieldFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    /**
     * Filter, which JobCustomFormField to fetch.
     */
    where: JobCustomFormFieldWhereUniqueInput
  }

  /**
   * JobCustomFormField findFirst
   */
  export type JobCustomFormFieldFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    /**
     * Filter, which JobCustomFormField to fetch.
     */
    where?: JobCustomFormFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobCustomFormFields to fetch.
     */
    orderBy?: JobCustomFormFieldOrderByWithRelationInput | JobCustomFormFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobCustomFormFields.
     */
    cursor?: JobCustomFormFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobCustomFormFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobCustomFormFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobCustomFormFields.
     */
    distinct?: JobCustomFormFieldScalarFieldEnum | JobCustomFormFieldScalarFieldEnum[]
  }

  /**
   * JobCustomFormField findFirstOrThrow
   */
  export type JobCustomFormFieldFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    /**
     * Filter, which JobCustomFormField to fetch.
     */
    where?: JobCustomFormFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobCustomFormFields to fetch.
     */
    orderBy?: JobCustomFormFieldOrderByWithRelationInput | JobCustomFormFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobCustomFormFields.
     */
    cursor?: JobCustomFormFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobCustomFormFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobCustomFormFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobCustomFormFields.
     */
    distinct?: JobCustomFormFieldScalarFieldEnum | JobCustomFormFieldScalarFieldEnum[]
  }

  /**
   * JobCustomFormField findMany
   */
  export type JobCustomFormFieldFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    /**
     * Filter, which JobCustomFormFields to fetch.
     */
    where?: JobCustomFormFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobCustomFormFields to fetch.
     */
    orderBy?: JobCustomFormFieldOrderByWithRelationInput | JobCustomFormFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobCustomFormFields.
     */
    cursor?: JobCustomFormFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobCustomFormFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobCustomFormFields.
     */
    skip?: number
    distinct?: JobCustomFormFieldScalarFieldEnum | JobCustomFormFieldScalarFieldEnum[]
  }

  /**
   * JobCustomFormField create
   */
  export type JobCustomFormFieldCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    /**
     * The data needed to create a JobCustomFormField.
     */
    data: XOR<JobCustomFormFieldCreateInput, JobCustomFormFieldUncheckedCreateInput>
  }

  /**
   * JobCustomFormField createMany
   */
  export type JobCustomFormFieldCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobCustomFormFields.
     */
    data: JobCustomFormFieldCreateManyInput | JobCustomFormFieldCreateManyInput[]
  }

  /**
   * JobCustomFormField createManyAndReturn
   */
  export type JobCustomFormFieldCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JobCustomFormFields.
     */
    data: JobCustomFormFieldCreateManyInput | JobCustomFormFieldCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobCustomFormField update
   */
  export type JobCustomFormFieldUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    /**
     * The data needed to update a JobCustomFormField.
     */
    data: XOR<JobCustomFormFieldUpdateInput, JobCustomFormFieldUncheckedUpdateInput>
    /**
     * Choose, which JobCustomFormField to update.
     */
    where: JobCustomFormFieldWhereUniqueInput
  }

  /**
   * JobCustomFormField updateMany
   */
  export type JobCustomFormFieldUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobCustomFormFields.
     */
    data: XOR<JobCustomFormFieldUpdateManyMutationInput, JobCustomFormFieldUncheckedUpdateManyInput>
    /**
     * Filter which JobCustomFormFields to update
     */
    where?: JobCustomFormFieldWhereInput
  }

  /**
   * JobCustomFormField upsert
   */
  export type JobCustomFormFieldUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    /**
     * The filter to search for the JobCustomFormField to update in case it exists.
     */
    where: JobCustomFormFieldWhereUniqueInput
    /**
     * In case the JobCustomFormField found by the `where` argument doesn't exist, create a new JobCustomFormField with this data.
     */
    create: XOR<JobCustomFormFieldCreateInput, JobCustomFormFieldUncheckedCreateInput>
    /**
     * In case the JobCustomFormField was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobCustomFormFieldUpdateInput, JobCustomFormFieldUncheckedUpdateInput>
  }

  /**
   * JobCustomFormField delete
   */
  export type JobCustomFormFieldDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
    /**
     * Filter which JobCustomFormField to delete.
     */
    where: JobCustomFormFieldWhereUniqueInput
  }

  /**
   * JobCustomFormField deleteMany
   */
  export type JobCustomFormFieldDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobCustomFormFields to delete
     */
    where?: JobCustomFormFieldWhereInput
  }

  /**
   * JobCustomFormField without action
   */
  export type JobCustomFormFieldDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCustomFormField
     */
    select?: JobCustomFormFieldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobCustomFormFieldInclude<ExtArgs> | null
  }


  /**
   * Model ReferralApplication
   */

  export type AggregateReferralApplication = {
    _count: ReferralApplicationCountAggregateOutputType | null
    _min: ReferralApplicationMinAggregateOutputType | null
    _max: ReferralApplicationMaxAggregateOutputType | null
  }

  export type ReferralApplicationMinAggregateOutputType = {
    id: string | null
    jobPostId: string | null
    userId: string | null
    employeeId: string | null
    status: string | null
    formData: string | null
    resumeUrl: string | null
    deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReferralApplicationMaxAggregateOutputType = {
    id: string | null
    jobPostId: string | null
    userId: string | null
    employeeId: string | null
    status: string | null
    formData: string | null
    resumeUrl: string | null
    deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReferralApplicationCountAggregateOutputType = {
    id: number
    jobPostId: number
    userId: number
    employeeId: number
    status: number
    formData: number
    resumeUrl: number
    deleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReferralApplicationMinAggregateInputType = {
    id?: true
    jobPostId?: true
    userId?: true
    employeeId?: true
    status?: true
    formData?: true
    resumeUrl?: true
    deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReferralApplicationMaxAggregateInputType = {
    id?: true
    jobPostId?: true
    userId?: true
    employeeId?: true
    status?: true
    formData?: true
    resumeUrl?: true
    deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReferralApplicationCountAggregateInputType = {
    id?: true
    jobPostId?: true
    userId?: true
    employeeId?: true
    status?: true
    formData?: true
    resumeUrl?: true
    deleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReferralApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralApplication to aggregate.
     */
    where?: ReferralApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralApplications to fetch.
     */
    orderBy?: ReferralApplicationOrderByWithRelationInput | ReferralApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReferralApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReferralApplications
    **/
    _count?: true | ReferralApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReferralApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReferralApplicationMaxAggregateInputType
  }

  export type GetReferralApplicationAggregateType<T extends ReferralApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateReferralApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferralApplication[P]>
      : GetScalarType<T[P], AggregateReferralApplication[P]>
  }




  export type ReferralApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralApplicationWhereInput
    orderBy?: ReferralApplicationOrderByWithAggregationInput | ReferralApplicationOrderByWithAggregationInput[]
    by: ReferralApplicationScalarFieldEnum[] | ReferralApplicationScalarFieldEnum
    having?: ReferralApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReferralApplicationCountAggregateInputType | true
    _min?: ReferralApplicationMinAggregateInputType
    _max?: ReferralApplicationMaxAggregateInputType
  }

  export type ReferralApplicationGroupByOutputType = {
    id: string
    jobPostId: string | null
    userId: string
    employeeId: string
    status: string
    formData: string
    resumeUrl: string | null
    deleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: ReferralApplicationCountAggregateOutputType | null
    _min: ReferralApplicationMinAggregateOutputType | null
    _max: ReferralApplicationMaxAggregateOutputType | null
  }

  type GetReferralApplicationGroupByPayload<T extends ReferralApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReferralApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReferralApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralApplicationGroupByOutputType[P]>
        }
      >
    >


  export type ReferralApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobPostId?: boolean
    userId?: boolean
    employeeId?: boolean
    status?: boolean
    formData?: boolean
    resumeUrl?: boolean
    deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    jobPost?: boolean | ReferralApplication$jobPostArgs<ExtArgs>
  }, ExtArgs["result"]["referralApplication"]>

  export type ReferralApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobPostId?: boolean
    userId?: boolean
    employeeId?: boolean
    status?: boolean
    formData?: boolean
    resumeUrl?: boolean
    deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    jobPost?: boolean | ReferralApplication$jobPostArgs<ExtArgs>
  }, ExtArgs["result"]["referralApplication"]>

  export type ReferralApplicationSelectScalar = {
    id?: boolean
    jobPostId?: boolean
    userId?: boolean
    employeeId?: boolean
    status?: boolean
    formData?: boolean
    resumeUrl?: boolean
    deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReferralApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    jobPost?: boolean | ReferralApplication$jobPostArgs<ExtArgs>
  }
  export type ReferralApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    jobPost?: boolean | ReferralApplication$jobPostArgs<ExtArgs>
  }

  export type $ReferralApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReferralApplication"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      jobPost: Prisma.$JobPostPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobPostId: string | null
      userId: string
      employeeId: string
      status: string
      formData: string
      resumeUrl: string | null
      deleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["referralApplication"]>
    composites: {}
  }

  type ReferralApplicationGetPayload<S extends boolean | null | undefined | ReferralApplicationDefaultArgs> = $Result.GetResult<Prisma.$ReferralApplicationPayload, S>

  type ReferralApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReferralApplicationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReferralApplicationCountAggregateInputType | true
    }

  export interface ReferralApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReferralApplication'], meta: { name: 'ReferralApplication' } }
    /**
     * Find zero or one ReferralApplication that matches the filter.
     * @param {ReferralApplicationFindUniqueArgs} args - Arguments to find a ReferralApplication
     * @example
     * // Get one ReferralApplication
     * const referralApplication = await prisma.referralApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReferralApplicationFindUniqueArgs>(args: SelectSubset<T, ReferralApplicationFindUniqueArgs<ExtArgs>>): Prisma__ReferralApplicationClient<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReferralApplication that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReferralApplicationFindUniqueOrThrowArgs} args - Arguments to find a ReferralApplication
     * @example
     * // Get one ReferralApplication
     * const referralApplication = await prisma.referralApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReferralApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, ReferralApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReferralApplicationClient<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReferralApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralApplicationFindFirstArgs} args - Arguments to find a ReferralApplication
     * @example
     * // Get one ReferralApplication
     * const referralApplication = await prisma.referralApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReferralApplicationFindFirstArgs>(args?: SelectSubset<T, ReferralApplicationFindFirstArgs<ExtArgs>>): Prisma__ReferralApplicationClient<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReferralApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralApplicationFindFirstOrThrowArgs} args - Arguments to find a ReferralApplication
     * @example
     * // Get one ReferralApplication
     * const referralApplication = await prisma.referralApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReferralApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, ReferralApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReferralApplicationClient<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReferralApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReferralApplications
     * const referralApplications = await prisma.referralApplication.findMany()
     * 
     * // Get first 10 ReferralApplications
     * const referralApplications = await prisma.referralApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const referralApplicationWithIdOnly = await prisma.referralApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReferralApplicationFindManyArgs>(args?: SelectSubset<T, ReferralApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReferralApplication.
     * @param {ReferralApplicationCreateArgs} args - Arguments to create a ReferralApplication.
     * @example
     * // Create one ReferralApplication
     * const ReferralApplication = await prisma.referralApplication.create({
     *   data: {
     *     // ... data to create a ReferralApplication
     *   }
     * })
     * 
     */
    create<T extends ReferralApplicationCreateArgs>(args: SelectSubset<T, ReferralApplicationCreateArgs<ExtArgs>>): Prisma__ReferralApplicationClient<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReferralApplications.
     * @param {ReferralApplicationCreateManyArgs} args - Arguments to create many ReferralApplications.
     * @example
     * // Create many ReferralApplications
     * const referralApplication = await prisma.referralApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReferralApplicationCreateManyArgs>(args?: SelectSubset<T, ReferralApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReferralApplications and returns the data saved in the database.
     * @param {ReferralApplicationCreateManyAndReturnArgs} args - Arguments to create many ReferralApplications.
     * @example
     * // Create many ReferralApplications
     * const referralApplication = await prisma.referralApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReferralApplications and only return the `id`
     * const referralApplicationWithIdOnly = await prisma.referralApplication.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReferralApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, ReferralApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReferralApplication.
     * @param {ReferralApplicationDeleteArgs} args - Arguments to delete one ReferralApplication.
     * @example
     * // Delete one ReferralApplication
     * const ReferralApplication = await prisma.referralApplication.delete({
     *   where: {
     *     // ... filter to delete one ReferralApplication
     *   }
     * })
     * 
     */
    delete<T extends ReferralApplicationDeleteArgs>(args: SelectSubset<T, ReferralApplicationDeleteArgs<ExtArgs>>): Prisma__ReferralApplicationClient<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReferralApplication.
     * @param {ReferralApplicationUpdateArgs} args - Arguments to update one ReferralApplication.
     * @example
     * // Update one ReferralApplication
     * const referralApplication = await prisma.referralApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReferralApplicationUpdateArgs>(args: SelectSubset<T, ReferralApplicationUpdateArgs<ExtArgs>>): Prisma__ReferralApplicationClient<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReferralApplications.
     * @param {ReferralApplicationDeleteManyArgs} args - Arguments to filter ReferralApplications to delete.
     * @example
     * // Delete a few ReferralApplications
     * const { count } = await prisma.referralApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReferralApplicationDeleteManyArgs>(args?: SelectSubset<T, ReferralApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReferralApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReferralApplications
     * const referralApplication = await prisma.referralApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReferralApplicationUpdateManyArgs>(args: SelectSubset<T, ReferralApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReferralApplication.
     * @param {ReferralApplicationUpsertArgs} args - Arguments to update or create a ReferralApplication.
     * @example
     * // Update or create a ReferralApplication
     * const referralApplication = await prisma.referralApplication.upsert({
     *   create: {
     *     // ... data to create a ReferralApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReferralApplication we want to update
     *   }
     * })
     */
    upsert<T extends ReferralApplicationUpsertArgs>(args: SelectSubset<T, ReferralApplicationUpsertArgs<ExtArgs>>): Prisma__ReferralApplicationClient<$Result.GetResult<Prisma.$ReferralApplicationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReferralApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralApplicationCountArgs} args - Arguments to filter ReferralApplications to count.
     * @example
     * // Count the number of ReferralApplications
     * const count = await prisma.referralApplication.count({
     *   where: {
     *     // ... the filter for the ReferralApplications we want to count
     *   }
     * })
    **/
    count<T extends ReferralApplicationCountArgs>(
      args?: Subset<T, ReferralApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReferralApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReferralApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReferralApplicationAggregateArgs>(args: Subset<T, ReferralApplicationAggregateArgs>): Prisma.PrismaPromise<GetReferralApplicationAggregateType<T>>

    /**
     * Group by ReferralApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralApplicationGroupByArgs} args - Group by arguments.
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
      T extends ReferralApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralApplicationGroupByArgs['orderBy'] }
        : { orderBy?: ReferralApplicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReferralApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferralApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReferralApplication model
   */
  readonly fields: ReferralApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReferralApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    jobPost<T extends ReferralApplication$jobPostArgs<ExtArgs> = {}>(args?: Subset<T, ReferralApplication$jobPostArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the ReferralApplication model
   */ 
  interface ReferralApplicationFieldRefs {
    readonly id: FieldRef<"ReferralApplication", 'String'>
    readonly jobPostId: FieldRef<"ReferralApplication", 'String'>
    readonly userId: FieldRef<"ReferralApplication", 'String'>
    readonly employeeId: FieldRef<"ReferralApplication", 'String'>
    readonly status: FieldRef<"ReferralApplication", 'String'>
    readonly formData: FieldRef<"ReferralApplication", 'String'>
    readonly resumeUrl: FieldRef<"ReferralApplication", 'String'>
    readonly deleted: FieldRef<"ReferralApplication", 'Boolean'>
    readonly createdAt: FieldRef<"ReferralApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"ReferralApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReferralApplication findUnique
   */
  export type ReferralApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralApplication to fetch.
     */
    where: ReferralApplicationWhereUniqueInput
  }

  /**
   * ReferralApplication findUniqueOrThrow
   */
  export type ReferralApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralApplication to fetch.
     */
    where: ReferralApplicationWhereUniqueInput
  }

  /**
   * ReferralApplication findFirst
   */
  export type ReferralApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralApplication to fetch.
     */
    where?: ReferralApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralApplications to fetch.
     */
    orderBy?: ReferralApplicationOrderByWithRelationInput | ReferralApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralApplications.
     */
    cursor?: ReferralApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralApplications.
     */
    distinct?: ReferralApplicationScalarFieldEnum | ReferralApplicationScalarFieldEnum[]
  }

  /**
   * ReferralApplication findFirstOrThrow
   */
  export type ReferralApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralApplication to fetch.
     */
    where?: ReferralApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralApplications to fetch.
     */
    orderBy?: ReferralApplicationOrderByWithRelationInput | ReferralApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralApplications.
     */
    cursor?: ReferralApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralApplications.
     */
    distinct?: ReferralApplicationScalarFieldEnum | ReferralApplicationScalarFieldEnum[]
  }

  /**
   * ReferralApplication findMany
   */
  export type ReferralApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralApplications to fetch.
     */
    where?: ReferralApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralApplications to fetch.
     */
    orderBy?: ReferralApplicationOrderByWithRelationInput | ReferralApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReferralApplications.
     */
    cursor?: ReferralApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralApplications.
     */
    skip?: number
    distinct?: ReferralApplicationScalarFieldEnum | ReferralApplicationScalarFieldEnum[]
  }

  /**
   * ReferralApplication create
   */
  export type ReferralApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a ReferralApplication.
     */
    data: XOR<ReferralApplicationCreateInput, ReferralApplicationUncheckedCreateInput>
  }

  /**
   * ReferralApplication createMany
   */
  export type ReferralApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReferralApplications.
     */
    data: ReferralApplicationCreateManyInput | ReferralApplicationCreateManyInput[]
  }

  /**
   * ReferralApplication createManyAndReturn
   */
  export type ReferralApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReferralApplications.
     */
    data: ReferralApplicationCreateManyInput | ReferralApplicationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReferralApplication update
   */
  export type ReferralApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a ReferralApplication.
     */
    data: XOR<ReferralApplicationUpdateInput, ReferralApplicationUncheckedUpdateInput>
    /**
     * Choose, which ReferralApplication to update.
     */
    where: ReferralApplicationWhereUniqueInput
  }

  /**
   * ReferralApplication updateMany
   */
  export type ReferralApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReferralApplications.
     */
    data: XOR<ReferralApplicationUpdateManyMutationInput, ReferralApplicationUncheckedUpdateManyInput>
    /**
     * Filter which ReferralApplications to update
     */
    where?: ReferralApplicationWhereInput
  }

  /**
   * ReferralApplication upsert
   */
  export type ReferralApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the ReferralApplication to update in case it exists.
     */
    where: ReferralApplicationWhereUniqueInput
    /**
     * In case the ReferralApplication found by the `where` argument doesn't exist, create a new ReferralApplication with this data.
     */
    create: XOR<ReferralApplicationCreateInput, ReferralApplicationUncheckedCreateInput>
    /**
     * In case the ReferralApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralApplicationUpdateInput, ReferralApplicationUncheckedUpdateInput>
  }

  /**
   * ReferralApplication delete
   */
  export type ReferralApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
    /**
     * Filter which ReferralApplication to delete.
     */
    where: ReferralApplicationWhereUniqueInput
  }

  /**
   * ReferralApplication deleteMany
   */
  export type ReferralApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralApplications to delete
     */
    where?: ReferralApplicationWhereInput
  }

  /**
   * ReferralApplication.jobPost
   */
  export type ReferralApplication$jobPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    where?: JobPostWhereInput
  }

  /**
   * ReferralApplication without action
   */
  export type ReferralApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralApplication
     */
    select?: ReferralApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralApplicationInclude<ExtArgs> | null
  }


  /**
   * Model ReferralForm
   */

  export type AggregateReferralForm = {
    _count: ReferralFormCountAggregateOutputType | null
    _min: ReferralFormMinAggregateOutputType | null
    _max: ReferralFormMaxAggregateOutputType | null
  }

  export type ReferralFormMinAggregateOutputType = {
    id: string | null
    userId: string | null
    formTitle: string | null
    fields: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReferralFormMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    formTitle: string | null
    fields: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReferralFormCountAggregateOutputType = {
    id: number
    userId: number
    formTitle: number
    fields: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReferralFormMinAggregateInputType = {
    id?: true
    userId?: true
    formTitle?: true
    fields?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReferralFormMaxAggregateInputType = {
    id?: true
    userId?: true
    formTitle?: true
    fields?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReferralFormCountAggregateInputType = {
    id?: true
    userId?: true
    formTitle?: true
    fields?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReferralFormAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralForm to aggregate.
     */
    where?: ReferralFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralForms to fetch.
     */
    orderBy?: ReferralFormOrderByWithRelationInput | ReferralFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReferralFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReferralForms
    **/
    _count?: true | ReferralFormCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReferralFormMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReferralFormMaxAggregateInputType
  }

  export type GetReferralFormAggregateType<T extends ReferralFormAggregateArgs> = {
        [P in keyof T & keyof AggregateReferralForm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferralForm[P]>
      : GetScalarType<T[P], AggregateReferralForm[P]>
  }




  export type ReferralFormGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralFormWhereInput
    orderBy?: ReferralFormOrderByWithAggregationInput | ReferralFormOrderByWithAggregationInput[]
    by: ReferralFormScalarFieldEnum[] | ReferralFormScalarFieldEnum
    having?: ReferralFormScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReferralFormCountAggregateInputType | true
    _min?: ReferralFormMinAggregateInputType
    _max?: ReferralFormMaxAggregateInputType
  }

  export type ReferralFormGroupByOutputType = {
    id: string
    userId: string
    formTitle: string
    fields: string
    createdAt: Date
    updatedAt: Date
    _count: ReferralFormCountAggregateOutputType | null
    _min: ReferralFormMinAggregateOutputType | null
    _max: ReferralFormMaxAggregateOutputType | null
  }

  type GetReferralFormGroupByPayload<T extends ReferralFormGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReferralFormGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReferralFormGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralFormGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralFormGroupByOutputType[P]>
        }
      >
    >


  export type ReferralFormSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    formTitle?: boolean
    fields?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referralForm"]>

  export type ReferralFormSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    formTitle?: boolean
    fields?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referralForm"]>

  export type ReferralFormSelectScalar = {
    id?: boolean
    userId?: boolean
    formTitle?: boolean
    fields?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReferralFormInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReferralFormIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReferralFormPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReferralForm"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      formTitle: string
      fields: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["referralForm"]>
    composites: {}
  }

  type ReferralFormGetPayload<S extends boolean | null | undefined | ReferralFormDefaultArgs> = $Result.GetResult<Prisma.$ReferralFormPayload, S>

  type ReferralFormCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReferralFormFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReferralFormCountAggregateInputType | true
    }

  export interface ReferralFormDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReferralForm'], meta: { name: 'ReferralForm' } }
    /**
     * Find zero or one ReferralForm that matches the filter.
     * @param {ReferralFormFindUniqueArgs} args - Arguments to find a ReferralForm
     * @example
     * // Get one ReferralForm
     * const referralForm = await prisma.referralForm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReferralFormFindUniqueArgs>(args: SelectSubset<T, ReferralFormFindUniqueArgs<ExtArgs>>): Prisma__ReferralFormClient<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReferralForm that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReferralFormFindUniqueOrThrowArgs} args - Arguments to find a ReferralForm
     * @example
     * // Get one ReferralForm
     * const referralForm = await prisma.referralForm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReferralFormFindUniqueOrThrowArgs>(args: SelectSubset<T, ReferralFormFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReferralFormClient<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReferralForm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFormFindFirstArgs} args - Arguments to find a ReferralForm
     * @example
     * // Get one ReferralForm
     * const referralForm = await prisma.referralForm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReferralFormFindFirstArgs>(args?: SelectSubset<T, ReferralFormFindFirstArgs<ExtArgs>>): Prisma__ReferralFormClient<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReferralForm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFormFindFirstOrThrowArgs} args - Arguments to find a ReferralForm
     * @example
     * // Get one ReferralForm
     * const referralForm = await prisma.referralForm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReferralFormFindFirstOrThrowArgs>(args?: SelectSubset<T, ReferralFormFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReferralFormClient<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReferralForms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFormFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReferralForms
     * const referralForms = await prisma.referralForm.findMany()
     * 
     * // Get first 10 ReferralForms
     * const referralForms = await prisma.referralForm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const referralFormWithIdOnly = await prisma.referralForm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReferralFormFindManyArgs>(args?: SelectSubset<T, ReferralFormFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReferralForm.
     * @param {ReferralFormCreateArgs} args - Arguments to create a ReferralForm.
     * @example
     * // Create one ReferralForm
     * const ReferralForm = await prisma.referralForm.create({
     *   data: {
     *     // ... data to create a ReferralForm
     *   }
     * })
     * 
     */
    create<T extends ReferralFormCreateArgs>(args: SelectSubset<T, ReferralFormCreateArgs<ExtArgs>>): Prisma__ReferralFormClient<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReferralForms.
     * @param {ReferralFormCreateManyArgs} args - Arguments to create many ReferralForms.
     * @example
     * // Create many ReferralForms
     * const referralForm = await prisma.referralForm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReferralFormCreateManyArgs>(args?: SelectSubset<T, ReferralFormCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReferralForms and returns the data saved in the database.
     * @param {ReferralFormCreateManyAndReturnArgs} args - Arguments to create many ReferralForms.
     * @example
     * // Create many ReferralForms
     * const referralForm = await prisma.referralForm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReferralForms and only return the `id`
     * const referralFormWithIdOnly = await prisma.referralForm.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReferralFormCreateManyAndReturnArgs>(args?: SelectSubset<T, ReferralFormCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReferralForm.
     * @param {ReferralFormDeleteArgs} args - Arguments to delete one ReferralForm.
     * @example
     * // Delete one ReferralForm
     * const ReferralForm = await prisma.referralForm.delete({
     *   where: {
     *     // ... filter to delete one ReferralForm
     *   }
     * })
     * 
     */
    delete<T extends ReferralFormDeleteArgs>(args: SelectSubset<T, ReferralFormDeleteArgs<ExtArgs>>): Prisma__ReferralFormClient<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReferralForm.
     * @param {ReferralFormUpdateArgs} args - Arguments to update one ReferralForm.
     * @example
     * // Update one ReferralForm
     * const referralForm = await prisma.referralForm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReferralFormUpdateArgs>(args: SelectSubset<T, ReferralFormUpdateArgs<ExtArgs>>): Prisma__ReferralFormClient<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReferralForms.
     * @param {ReferralFormDeleteManyArgs} args - Arguments to filter ReferralForms to delete.
     * @example
     * // Delete a few ReferralForms
     * const { count } = await prisma.referralForm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReferralFormDeleteManyArgs>(args?: SelectSubset<T, ReferralFormDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReferralForms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFormUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReferralForms
     * const referralForm = await prisma.referralForm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReferralFormUpdateManyArgs>(args: SelectSubset<T, ReferralFormUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReferralForm.
     * @param {ReferralFormUpsertArgs} args - Arguments to update or create a ReferralForm.
     * @example
     * // Update or create a ReferralForm
     * const referralForm = await prisma.referralForm.upsert({
     *   create: {
     *     // ... data to create a ReferralForm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReferralForm we want to update
     *   }
     * })
     */
    upsert<T extends ReferralFormUpsertArgs>(args: SelectSubset<T, ReferralFormUpsertArgs<ExtArgs>>): Prisma__ReferralFormClient<$Result.GetResult<Prisma.$ReferralFormPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReferralForms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFormCountArgs} args - Arguments to filter ReferralForms to count.
     * @example
     * // Count the number of ReferralForms
     * const count = await prisma.referralForm.count({
     *   where: {
     *     // ... the filter for the ReferralForms we want to count
     *   }
     * })
    **/
    count<T extends ReferralFormCountArgs>(
      args?: Subset<T, ReferralFormCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReferralFormCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReferralForm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFormAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReferralFormAggregateArgs>(args: Subset<T, ReferralFormAggregateArgs>): Prisma.PrismaPromise<GetReferralFormAggregateType<T>>

    /**
     * Group by ReferralForm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFormGroupByArgs} args - Group by arguments.
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
      T extends ReferralFormGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralFormGroupByArgs['orderBy'] }
        : { orderBy?: ReferralFormGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReferralFormGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferralFormGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReferralForm model
   */
  readonly fields: ReferralFormFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReferralForm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralFormClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ReferralForm model
   */ 
  interface ReferralFormFieldRefs {
    readonly id: FieldRef<"ReferralForm", 'String'>
    readonly userId: FieldRef<"ReferralForm", 'String'>
    readonly formTitle: FieldRef<"ReferralForm", 'String'>
    readonly fields: FieldRef<"ReferralForm", 'String'>
    readonly createdAt: FieldRef<"ReferralForm", 'DateTime'>
    readonly updatedAt: FieldRef<"ReferralForm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReferralForm findUnique
   */
  export type ReferralFormFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    /**
     * Filter, which ReferralForm to fetch.
     */
    where: ReferralFormWhereUniqueInput
  }

  /**
   * ReferralForm findUniqueOrThrow
   */
  export type ReferralFormFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    /**
     * Filter, which ReferralForm to fetch.
     */
    where: ReferralFormWhereUniqueInput
  }

  /**
   * ReferralForm findFirst
   */
  export type ReferralFormFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    /**
     * Filter, which ReferralForm to fetch.
     */
    where?: ReferralFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralForms to fetch.
     */
    orderBy?: ReferralFormOrderByWithRelationInput | ReferralFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralForms.
     */
    cursor?: ReferralFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralForms.
     */
    distinct?: ReferralFormScalarFieldEnum | ReferralFormScalarFieldEnum[]
  }

  /**
   * ReferralForm findFirstOrThrow
   */
  export type ReferralFormFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    /**
     * Filter, which ReferralForm to fetch.
     */
    where?: ReferralFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralForms to fetch.
     */
    orderBy?: ReferralFormOrderByWithRelationInput | ReferralFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralForms.
     */
    cursor?: ReferralFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralForms.
     */
    distinct?: ReferralFormScalarFieldEnum | ReferralFormScalarFieldEnum[]
  }

  /**
   * ReferralForm findMany
   */
  export type ReferralFormFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    /**
     * Filter, which ReferralForms to fetch.
     */
    where?: ReferralFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralForms to fetch.
     */
    orderBy?: ReferralFormOrderByWithRelationInput | ReferralFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReferralForms.
     */
    cursor?: ReferralFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralForms.
     */
    skip?: number
    distinct?: ReferralFormScalarFieldEnum | ReferralFormScalarFieldEnum[]
  }

  /**
   * ReferralForm create
   */
  export type ReferralFormCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    /**
     * The data needed to create a ReferralForm.
     */
    data: XOR<ReferralFormCreateInput, ReferralFormUncheckedCreateInput>
  }

  /**
   * ReferralForm createMany
   */
  export type ReferralFormCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReferralForms.
     */
    data: ReferralFormCreateManyInput | ReferralFormCreateManyInput[]
  }

  /**
   * ReferralForm createManyAndReturn
   */
  export type ReferralFormCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReferralForms.
     */
    data: ReferralFormCreateManyInput | ReferralFormCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReferralForm update
   */
  export type ReferralFormUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    /**
     * The data needed to update a ReferralForm.
     */
    data: XOR<ReferralFormUpdateInput, ReferralFormUncheckedUpdateInput>
    /**
     * Choose, which ReferralForm to update.
     */
    where: ReferralFormWhereUniqueInput
  }

  /**
   * ReferralForm updateMany
   */
  export type ReferralFormUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReferralForms.
     */
    data: XOR<ReferralFormUpdateManyMutationInput, ReferralFormUncheckedUpdateManyInput>
    /**
     * Filter which ReferralForms to update
     */
    where?: ReferralFormWhereInput
  }

  /**
   * ReferralForm upsert
   */
  export type ReferralFormUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    /**
     * The filter to search for the ReferralForm to update in case it exists.
     */
    where: ReferralFormWhereUniqueInput
    /**
     * In case the ReferralForm found by the `where` argument doesn't exist, create a new ReferralForm with this data.
     */
    create: XOR<ReferralFormCreateInput, ReferralFormUncheckedCreateInput>
    /**
     * In case the ReferralForm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralFormUpdateInput, ReferralFormUncheckedUpdateInput>
  }

  /**
   * ReferralForm delete
   */
  export type ReferralFormDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
    /**
     * Filter which ReferralForm to delete.
     */
    where: ReferralFormWhereUniqueInput
  }

  /**
   * ReferralForm deleteMany
   */
  export type ReferralFormDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralForms to delete
     */
    where?: ReferralFormWhereInput
  }

  /**
   * ReferralForm without action
   */
  export type ReferralFormDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralForm
     */
    select?: ReferralFormSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralFormInclude<ExtArgs> | null
  }


  /**
   * Model JobSeekerProfile
   */

  export type AggregateJobSeekerProfile = {
    _count: JobSeekerProfileCountAggregateOutputType | null
    _avg: JobSeekerProfileAvgAggregateOutputType | null
    _sum: JobSeekerProfileSumAggregateOutputType | null
    _min: JobSeekerProfileMinAggregateOutputType | null
    _max: JobSeekerProfileMaxAggregateOutputType | null
  }

  export type JobSeekerProfileAvgAggregateOutputType = {
    experience: number | null
  }

  export type JobSeekerProfileSumAggregateOutputType = {
    experience: number | null
  }

  export type JobSeekerProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    email: string | null
    experience: number | null
    primaryRole: string | null
    skills: string | null
    jobPreferences: string | null
    preferredLocations: string | null
    profileSummary: string | null
    resumeUrl: string | null
    profileImageURL: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobSeekerProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    email: string | null
    experience: number | null
    primaryRole: string | null
    skills: string | null
    jobPreferences: string | null
    preferredLocations: string | null
    profileSummary: string | null
    resumeUrl: string | null
    profileImageURL: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobSeekerProfileCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    email: number
    experience: number
    primaryRole: number
    skills: number
    jobPreferences: number
    preferredLocations: number
    profileSummary: number
    resumeUrl: number
    profileImageURL: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobSeekerProfileAvgAggregateInputType = {
    experience?: true
  }

  export type JobSeekerProfileSumAggregateInputType = {
    experience?: true
  }

  export type JobSeekerProfileMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    email?: true
    experience?: true
    primaryRole?: true
    skills?: true
    jobPreferences?: true
    preferredLocations?: true
    profileSummary?: true
    resumeUrl?: true
    profileImageURL?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobSeekerProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    email?: true
    experience?: true
    primaryRole?: true
    skills?: true
    jobPreferences?: true
    preferredLocations?: true
    profileSummary?: true
    resumeUrl?: true
    profileImageURL?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobSeekerProfileCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    email?: true
    experience?: true
    primaryRole?: true
    skills?: true
    jobPreferences?: true
    preferredLocations?: true
    profileSummary?: true
    resumeUrl?: true
    profileImageURL?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobSeekerProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSeekerProfile to aggregate.
     */
    where?: JobSeekerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekerProfiles to fetch.
     */
    orderBy?: JobSeekerProfileOrderByWithRelationInput | JobSeekerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobSeekerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobSeekerProfiles
    **/
    _count?: true | JobSeekerProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobSeekerProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSeekerProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobSeekerProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobSeekerProfileMaxAggregateInputType
  }

  export type GetJobSeekerProfileAggregateType<T extends JobSeekerProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateJobSeekerProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobSeekerProfile[P]>
      : GetScalarType<T[P], AggregateJobSeekerProfile[P]>
  }




  export type JobSeekerProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobSeekerProfileWhereInput
    orderBy?: JobSeekerProfileOrderByWithAggregationInput | JobSeekerProfileOrderByWithAggregationInput[]
    by: JobSeekerProfileScalarFieldEnum[] | JobSeekerProfileScalarFieldEnum
    having?: JobSeekerProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobSeekerProfileCountAggregateInputType | true
    _avg?: JobSeekerProfileAvgAggregateInputType
    _sum?: JobSeekerProfileSumAggregateInputType
    _min?: JobSeekerProfileMinAggregateInputType
    _max?: JobSeekerProfileMaxAggregateInputType
  }

  export type JobSeekerProfileGroupByOutputType = {
    id: string
    userId: string
    fullName: string
    email: string
    experience: number | null
    primaryRole: string | null
    skills: string | null
    jobPreferences: string | null
    preferredLocations: string | null
    profileSummary: string | null
    resumeUrl: string | null
    profileImageURL: string | null
    createdAt: Date
    updatedAt: Date
    _count: JobSeekerProfileCountAggregateOutputType | null
    _avg: JobSeekerProfileAvgAggregateOutputType | null
    _sum: JobSeekerProfileSumAggregateOutputType | null
    _min: JobSeekerProfileMinAggregateOutputType | null
    _max: JobSeekerProfileMaxAggregateOutputType | null
  }

  type GetJobSeekerProfileGroupByPayload<T extends JobSeekerProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobSeekerProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobSeekerProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobSeekerProfileGroupByOutputType[P]>
            : GetScalarType<T[P], JobSeekerProfileGroupByOutputType[P]>
        }
      >
    >


  export type JobSeekerProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    email?: boolean
    experience?: boolean
    primaryRole?: boolean
    skills?: boolean
    jobPreferences?: boolean
    preferredLocations?: boolean
    profileSummary?: boolean
    resumeUrl?: boolean
    profileImageURL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSeekerProfile"]>

  export type JobSeekerProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    email?: boolean
    experience?: boolean
    primaryRole?: boolean
    skills?: boolean
    jobPreferences?: boolean
    preferredLocations?: boolean
    profileSummary?: boolean
    resumeUrl?: boolean
    profileImageURL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSeekerProfile"]>

  export type JobSeekerProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    email?: boolean
    experience?: boolean
    primaryRole?: boolean
    skills?: boolean
    jobPreferences?: boolean
    preferredLocations?: boolean
    profileSummary?: boolean
    resumeUrl?: boolean
    profileImageURL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobSeekerProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JobSeekerProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JobSeekerProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobSeekerProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fullName: string
      email: string
      experience: number | null
      primaryRole: string | null
      skills: string | null
      jobPreferences: string | null
      preferredLocations: string | null
      profileSummary: string | null
      resumeUrl: string | null
      profileImageURL: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jobSeekerProfile"]>
    composites: {}
  }

  type JobSeekerProfileGetPayload<S extends boolean | null | undefined | JobSeekerProfileDefaultArgs> = $Result.GetResult<Prisma.$JobSeekerProfilePayload, S>

  type JobSeekerProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobSeekerProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobSeekerProfileCountAggregateInputType | true
    }

  export interface JobSeekerProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobSeekerProfile'], meta: { name: 'JobSeekerProfile' } }
    /**
     * Find zero or one JobSeekerProfile that matches the filter.
     * @param {JobSeekerProfileFindUniqueArgs} args - Arguments to find a JobSeekerProfile
     * @example
     * // Get one JobSeekerProfile
     * const jobSeekerProfile = await prisma.jobSeekerProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobSeekerProfileFindUniqueArgs>(args: SelectSubset<T, JobSeekerProfileFindUniqueArgs<ExtArgs>>): Prisma__JobSeekerProfileClient<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JobSeekerProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobSeekerProfileFindUniqueOrThrowArgs} args - Arguments to find a JobSeekerProfile
     * @example
     * // Get one JobSeekerProfile
     * const jobSeekerProfile = await prisma.jobSeekerProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobSeekerProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, JobSeekerProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobSeekerProfileClient<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JobSeekerProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerProfileFindFirstArgs} args - Arguments to find a JobSeekerProfile
     * @example
     * // Get one JobSeekerProfile
     * const jobSeekerProfile = await prisma.jobSeekerProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobSeekerProfileFindFirstArgs>(args?: SelectSubset<T, JobSeekerProfileFindFirstArgs<ExtArgs>>): Prisma__JobSeekerProfileClient<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JobSeekerProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerProfileFindFirstOrThrowArgs} args - Arguments to find a JobSeekerProfile
     * @example
     * // Get one JobSeekerProfile
     * const jobSeekerProfile = await prisma.jobSeekerProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobSeekerProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, JobSeekerProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobSeekerProfileClient<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JobSeekerProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobSeekerProfiles
     * const jobSeekerProfiles = await prisma.jobSeekerProfile.findMany()
     * 
     * // Get first 10 JobSeekerProfiles
     * const jobSeekerProfiles = await prisma.jobSeekerProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobSeekerProfileWithIdOnly = await prisma.jobSeekerProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobSeekerProfileFindManyArgs>(args?: SelectSubset<T, JobSeekerProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JobSeekerProfile.
     * @param {JobSeekerProfileCreateArgs} args - Arguments to create a JobSeekerProfile.
     * @example
     * // Create one JobSeekerProfile
     * const JobSeekerProfile = await prisma.jobSeekerProfile.create({
     *   data: {
     *     // ... data to create a JobSeekerProfile
     *   }
     * })
     * 
     */
    create<T extends JobSeekerProfileCreateArgs>(args: SelectSubset<T, JobSeekerProfileCreateArgs<ExtArgs>>): Prisma__JobSeekerProfileClient<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JobSeekerProfiles.
     * @param {JobSeekerProfileCreateManyArgs} args - Arguments to create many JobSeekerProfiles.
     * @example
     * // Create many JobSeekerProfiles
     * const jobSeekerProfile = await prisma.jobSeekerProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobSeekerProfileCreateManyArgs>(args?: SelectSubset<T, JobSeekerProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobSeekerProfiles and returns the data saved in the database.
     * @param {JobSeekerProfileCreateManyAndReturnArgs} args - Arguments to create many JobSeekerProfiles.
     * @example
     * // Create many JobSeekerProfiles
     * const jobSeekerProfile = await prisma.jobSeekerProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobSeekerProfiles and only return the `id`
     * const jobSeekerProfileWithIdOnly = await prisma.jobSeekerProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobSeekerProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, JobSeekerProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JobSeekerProfile.
     * @param {JobSeekerProfileDeleteArgs} args - Arguments to delete one JobSeekerProfile.
     * @example
     * // Delete one JobSeekerProfile
     * const JobSeekerProfile = await prisma.jobSeekerProfile.delete({
     *   where: {
     *     // ... filter to delete one JobSeekerProfile
     *   }
     * })
     * 
     */
    delete<T extends JobSeekerProfileDeleteArgs>(args: SelectSubset<T, JobSeekerProfileDeleteArgs<ExtArgs>>): Prisma__JobSeekerProfileClient<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JobSeekerProfile.
     * @param {JobSeekerProfileUpdateArgs} args - Arguments to update one JobSeekerProfile.
     * @example
     * // Update one JobSeekerProfile
     * const jobSeekerProfile = await prisma.jobSeekerProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobSeekerProfileUpdateArgs>(args: SelectSubset<T, JobSeekerProfileUpdateArgs<ExtArgs>>): Prisma__JobSeekerProfileClient<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JobSeekerProfiles.
     * @param {JobSeekerProfileDeleteManyArgs} args - Arguments to filter JobSeekerProfiles to delete.
     * @example
     * // Delete a few JobSeekerProfiles
     * const { count } = await prisma.jobSeekerProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobSeekerProfileDeleteManyArgs>(args?: SelectSubset<T, JobSeekerProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobSeekerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobSeekerProfiles
     * const jobSeekerProfile = await prisma.jobSeekerProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobSeekerProfileUpdateManyArgs>(args: SelectSubset<T, JobSeekerProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobSeekerProfile.
     * @param {JobSeekerProfileUpsertArgs} args - Arguments to update or create a JobSeekerProfile.
     * @example
     * // Update or create a JobSeekerProfile
     * const jobSeekerProfile = await prisma.jobSeekerProfile.upsert({
     *   create: {
     *     // ... data to create a JobSeekerProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobSeekerProfile we want to update
     *   }
     * })
     */
    upsert<T extends JobSeekerProfileUpsertArgs>(args: SelectSubset<T, JobSeekerProfileUpsertArgs<ExtArgs>>): Prisma__JobSeekerProfileClient<$Result.GetResult<Prisma.$JobSeekerProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JobSeekerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerProfileCountArgs} args - Arguments to filter JobSeekerProfiles to count.
     * @example
     * // Count the number of JobSeekerProfiles
     * const count = await prisma.jobSeekerProfile.count({
     *   where: {
     *     // ... the filter for the JobSeekerProfiles we want to count
     *   }
     * })
    **/
    count<T extends JobSeekerProfileCountArgs>(
      args?: Subset<T, JobSeekerProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobSeekerProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobSeekerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobSeekerProfileAggregateArgs>(args: Subset<T, JobSeekerProfileAggregateArgs>): Prisma.PrismaPromise<GetJobSeekerProfileAggregateType<T>>

    /**
     * Group by JobSeekerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerProfileGroupByArgs} args - Group by arguments.
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
      T extends JobSeekerProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobSeekerProfileGroupByArgs['orderBy'] }
        : { orderBy?: JobSeekerProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobSeekerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobSeekerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobSeekerProfile model
   */
  readonly fields: JobSeekerProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobSeekerProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobSeekerProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the JobSeekerProfile model
   */ 
  interface JobSeekerProfileFieldRefs {
    readonly id: FieldRef<"JobSeekerProfile", 'String'>
    readonly userId: FieldRef<"JobSeekerProfile", 'String'>
    readonly fullName: FieldRef<"JobSeekerProfile", 'String'>
    readonly email: FieldRef<"JobSeekerProfile", 'String'>
    readonly experience: FieldRef<"JobSeekerProfile", 'Int'>
    readonly primaryRole: FieldRef<"JobSeekerProfile", 'String'>
    readonly skills: FieldRef<"JobSeekerProfile", 'String'>
    readonly jobPreferences: FieldRef<"JobSeekerProfile", 'String'>
    readonly preferredLocations: FieldRef<"JobSeekerProfile", 'String'>
    readonly profileSummary: FieldRef<"JobSeekerProfile", 'String'>
    readonly resumeUrl: FieldRef<"JobSeekerProfile", 'String'>
    readonly profileImageURL: FieldRef<"JobSeekerProfile", 'String'>
    readonly createdAt: FieldRef<"JobSeekerProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"JobSeekerProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobSeekerProfile findUnique
   */
  export type JobSeekerProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerProfile to fetch.
     */
    where: JobSeekerProfileWhereUniqueInput
  }

  /**
   * JobSeekerProfile findUniqueOrThrow
   */
  export type JobSeekerProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerProfile to fetch.
     */
    where: JobSeekerProfileWhereUniqueInput
  }

  /**
   * JobSeekerProfile findFirst
   */
  export type JobSeekerProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerProfile to fetch.
     */
    where?: JobSeekerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekerProfiles to fetch.
     */
    orderBy?: JobSeekerProfileOrderByWithRelationInput | JobSeekerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSeekerProfiles.
     */
    cursor?: JobSeekerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSeekerProfiles.
     */
    distinct?: JobSeekerProfileScalarFieldEnum | JobSeekerProfileScalarFieldEnum[]
  }

  /**
   * JobSeekerProfile findFirstOrThrow
   */
  export type JobSeekerProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerProfile to fetch.
     */
    where?: JobSeekerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekerProfiles to fetch.
     */
    orderBy?: JobSeekerProfileOrderByWithRelationInput | JobSeekerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSeekerProfiles.
     */
    cursor?: JobSeekerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSeekerProfiles.
     */
    distinct?: JobSeekerProfileScalarFieldEnum | JobSeekerProfileScalarFieldEnum[]
  }

  /**
   * JobSeekerProfile findMany
   */
  export type JobSeekerProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerProfiles to fetch.
     */
    where?: JobSeekerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekerProfiles to fetch.
     */
    orderBy?: JobSeekerProfileOrderByWithRelationInput | JobSeekerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobSeekerProfiles.
     */
    cursor?: JobSeekerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekerProfiles.
     */
    skip?: number
    distinct?: JobSeekerProfileScalarFieldEnum | JobSeekerProfileScalarFieldEnum[]
  }

  /**
   * JobSeekerProfile create
   */
  export type JobSeekerProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a JobSeekerProfile.
     */
    data: XOR<JobSeekerProfileCreateInput, JobSeekerProfileUncheckedCreateInput>
  }

  /**
   * JobSeekerProfile createMany
   */
  export type JobSeekerProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobSeekerProfiles.
     */
    data: JobSeekerProfileCreateManyInput | JobSeekerProfileCreateManyInput[]
  }

  /**
   * JobSeekerProfile createManyAndReturn
   */
  export type JobSeekerProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JobSeekerProfiles.
     */
    data: JobSeekerProfileCreateManyInput | JobSeekerProfileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobSeekerProfile update
   */
  export type JobSeekerProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a JobSeekerProfile.
     */
    data: XOR<JobSeekerProfileUpdateInput, JobSeekerProfileUncheckedUpdateInput>
    /**
     * Choose, which JobSeekerProfile to update.
     */
    where: JobSeekerProfileWhereUniqueInput
  }

  /**
   * JobSeekerProfile updateMany
   */
  export type JobSeekerProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobSeekerProfiles.
     */
    data: XOR<JobSeekerProfileUpdateManyMutationInput, JobSeekerProfileUncheckedUpdateManyInput>
    /**
     * Filter which JobSeekerProfiles to update
     */
    where?: JobSeekerProfileWhereInput
  }

  /**
   * JobSeekerProfile upsert
   */
  export type JobSeekerProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the JobSeekerProfile to update in case it exists.
     */
    where: JobSeekerProfileWhereUniqueInput
    /**
     * In case the JobSeekerProfile found by the `where` argument doesn't exist, create a new JobSeekerProfile with this data.
     */
    create: XOR<JobSeekerProfileCreateInput, JobSeekerProfileUncheckedCreateInput>
    /**
     * In case the JobSeekerProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobSeekerProfileUpdateInput, JobSeekerProfileUncheckedUpdateInput>
  }

  /**
   * JobSeekerProfile delete
   */
  export type JobSeekerProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
    /**
     * Filter which JobSeekerProfile to delete.
     */
    where: JobSeekerProfileWhereUniqueInput
  }

  /**
   * JobSeekerProfile deleteMany
   */
  export type JobSeekerProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSeekerProfiles to delete
     */
    where?: JobSeekerProfileWhereInput
  }

  /**
   * JobSeekerProfile without action
   */
  export type JobSeekerProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerProfile
     */
    select?: JobSeekerProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerProfileInclude<ExtArgs> | null
  }


  /**
   * Model ReferralInvitation
   */

  export type AggregateReferralInvitation = {
    _count: ReferralInvitationCountAggregateOutputType | null
    _min: ReferralInvitationMinAggregateOutputType | null
    _max: ReferralInvitationMaxAggregateOutputType | null
  }

  export type ReferralInvitationMinAggregateOutputType = {
    id: string | null
    inviterId: string | null
    candidateId: string | null
    jobPostId: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ReferralInvitationMaxAggregateOutputType = {
    id: string | null
    inviterId: string | null
    candidateId: string | null
    jobPostId: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ReferralInvitationCountAggregateOutputType = {
    id: number
    inviterId: number
    candidateId: number
    jobPostId: number
    status: number
    createdAt: number
    _all: number
  }


  export type ReferralInvitationMinAggregateInputType = {
    id?: true
    inviterId?: true
    candidateId?: true
    jobPostId?: true
    status?: true
    createdAt?: true
  }

  export type ReferralInvitationMaxAggregateInputType = {
    id?: true
    inviterId?: true
    candidateId?: true
    jobPostId?: true
    status?: true
    createdAt?: true
  }

  export type ReferralInvitationCountAggregateInputType = {
    id?: true
    inviterId?: true
    candidateId?: true
    jobPostId?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ReferralInvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralInvitation to aggregate.
     */
    where?: ReferralInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralInvitations to fetch.
     */
    orderBy?: ReferralInvitationOrderByWithRelationInput | ReferralInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReferralInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReferralInvitations
    **/
    _count?: true | ReferralInvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReferralInvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReferralInvitationMaxAggregateInputType
  }

  export type GetReferralInvitationAggregateType<T extends ReferralInvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateReferralInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferralInvitation[P]>
      : GetScalarType<T[P], AggregateReferralInvitation[P]>
  }




  export type ReferralInvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralInvitationWhereInput
    orderBy?: ReferralInvitationOrderByWithAggregationInput | ReferralInvitationOrderByWithAggregationInput[]
    by: ReferralInvitationScalarFieldEnum[] | ReferralInvitationScalarFieldEnum
    having?: ReferralInvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReferralInvitationCountAggregateInputType | true
    _min?: ReferralInvitationMinAggregateInputType
    _max?: ReferralInvitationMaxAggregateInputType
  }

  export type ReferralInvitationGroupByOutputType = {
    id: string
    inviterId: string
    candidateId: string
    jobPostId: string | null
    status: string
    createdAt: Date
    _count: ReferralInvitationCountAggregateOutputType | null
    _min: ReferralInvitationMinAggregateOutputType | null
    _max: ReferralInvitationMaxAggregateOutputType | null
  }

  type GetReferralInvitationGroupByPayload<T extends ReferralInvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReferralInvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReferralInvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralInvitationGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralInvitationGroupByOutputType[P]>
        }
      >
    >


  export type ReferralInvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inviterId?: boolean
    candidateId?: boolean
    jobPostId?: boolean
    status?: boolean
    createdAt?: boolean
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    candidate?: boolean | UserDefaultArgs<ExtArgs>
    jobPost?: boolean | ReferralInvitation$jobPostArgs<ExtArgs>
  }, ExtArgs["result"]["referralInvitation"]>

  export type ReferralInvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inviterId?: boolean
    candidateId?: boolean
    jobPostId?: boolean
    status?: boolean
    createdAt?: boolean
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    candidate?: boolean | UserDefaultArgs<ExtArgs>
    jobPost?: boolean | ReferralInvitation$jobPostArgs<ExtArgs>
  }, ExtArgs["result"]["referralInvitation"]>

  export type ReferralInvitationSelectScalar = {
    id?: boolean
    inviterId?: boolean
    candidateId?: boolean
    jobPostId?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ReferralInvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    candidate?: boolean | UserDefaultArgs<ExtArgs>
    jobPost?: boolean | ReferralInvitation$jobPostArgs<ExtArgs>
  }
  export type ReferralInvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    candidate?: boolean | UserDefaultArgs<ExtArgs>
    jobPost?: boolean | ReferralInvitation$jobPostArgs<ExtArgs>
  }

  export type $ReferralInvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReferralInvitation"
    objects: {
      inviter: Prisma.$UserPayload<ExtArgs>
      candidate: Prisma.$UserPayload<ExtArgs>
      jobPost: Prisma.$JobPostPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      inviterId: string
      candidateId: string
      jobPostId: string | null
      status: string
      createdAt: Date
    }, ExtArgs["result"]["referralInvitation"]>
    composites: {}
  }

  type ReferralInvitationGetPayload<S extends boolean | null | undefined | ReferralInvitationDefaultArgs> = $Result.GetResult<Prisma.$ReferralInvitationPayload, S>

  type ReferralInvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReferralInvitationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReferralInvitationCountAggregateInputType | true
    }

  export interface ReferralInvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReferralInvitation'], meta: { name: 'ReferralInvitation' } }
    /**
     * Find zero or one ReferralInvitation that matches the filter.
     * @param {ReferralInvitationFindUniqueArgs} args - Arguments to find a ReferralInvitation
     * @example
     * // Get one ReferralInvitation
     * const referralInvitation = await prisma.referralInvitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReferralInvitationFindUniqueArgs>(args: SelectSubset<T, ReferralInvitationFindUniqueArgs<ExtArgs>>): Prisma__ReferralInvitationClient<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReferralInvitation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReferralInvitationFindUniqueOrThrowArgs} args - Arguments to find a ReferralInvitation
     * @example
     * // Get one ReferralInvitation
     * const referralInvitation = await prisma.referralInvitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReferralInvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, ReferralInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReferralInvitationClient<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReferralInvitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralInvitationFindFirstArgs} args - Arguments to find a ReferralInvitation
     * @example
     * // Get one ReferralInvitation
     * const referralInvitation = await prisma.referralInvitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReferralInvitationFindFirstArgs>(args?: SelectSubset<T, ReferralInvitationFindFirstArgs<ExtArgs>>): Prisma__ReferralInvitationClient<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReferralInvitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralInvitationFindFirstOrThrowArgs} args - Arguments to find a ReferralInvitation
     * @example
     * // Get one ReferralInvitation
     * const referralInvitation = await prisma.referralInvitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReferralInvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, ReferralInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReferralInvitationClient<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReferralInvitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralInvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReferralInvitations
     * const referralInvitations = await prisma.referralInvitation.findMany()
     * 
     * // Get first 10 ReferralInvitations
     * const referralInvitations = await prisma.referralInvitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const referralInvitationWithIdOnly = await prisma.referralInvitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReferralInvitationFindManyArgs>(args?: SelectSubset<T, ReferralInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReferralInvitation.
     * @param {ReferralInvitationCreateArgs} args - Arguments to create a ReferralInvitation.
     * @example
     * // Create one ReferralInvitation
     * const ReferralInvitation = await prisma.referralInvitation.create({
     *   data: {
     *     // ... data to create a ReferralInvitation
     *   }
     * })
     * 
     */
    create<T extends ReferralInvitationCreateArgs>(args: SelectSubset<T, ReferralInvitationCreateArgs<ExtArgs>>): Prisma__ReferralInvitationClient<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReferralInvitations.
     * @param {ReferralInvitationCreateManyArgs} args - Arguments to create many ReferralInvitations.
     * @example
     * // Create many ReferralInvitations
     * const referralInvitation = await prisma.referralInvitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReferralInvitationCreateManyArgs>(args?: SelectSubset<T, ReferralInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReferralInvitations and returns the data saved in the database.
     * @param {ReferralInvitationCreateManyAndReturnArgs} args - Arguments to create many ReferralInvitations.
     * @example
     * // Create many ReferralInvitations
     * const referralInvitation = await prisma.referralInvitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReferralInvitations and only return the `id`
     * const referralInvitationWithIdOnly = await prisma.referralInvitation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReferralInvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, ReferralInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReferralInvitation.
     * @param {ReferralInvitationDeleteArgs} args - Arguments to delete one ReferralInvitation.
     * @example
     * // Delete one ReferralInvitation
     * const ReferralInvitation = await prisma.referralInvitation.delete({
     *   where: {
     *     // ... filter to delete one ReferralInvitation
     *   }
     * })
     * 
     */
    delete<T extends ReferralInvitationDeleteArgs>(args: SelectSubset<T, ReferralInvitationDeleteArgs<ExtArgs>>): Prisma__ReferralInvitationClient<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReferralInvitation.
     * @param {ReferralInvitationUpdateArgs} args - Arguments to update one ReferralInvitation.
     * @example
     * // Update one ReferralInvitation
     * const referralInvitation = await prisma.referralInvitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReferralInvitationUpdateArgs>(args: SelectSubset<T, ReferralInvitationUpdateArgs<ExtArgs>>): Prisma__ReferralInvitationClient<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReferralInvitations.
     * @param {ReferralInvitationDeleteManyArgs} args - Arguments to filter ReferralInvitations to delete.
     * @example
     * // Delete a few ReferralInvitations
     * const { count } = await prisma.referralInvitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReferralInvitationDeleteManyArgs>(args?: SelectSubset<T, ReferralInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReferralInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralInvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReferralInvitations
     * const referralInvitation = await prisma.referralInvitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReferralInvitationUpdateManyArgs>(args: SelectSubset<T, ReferralInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReferralInvitation.
     * @param {ReferralInvitationUpsertArgs} args - Arguments to update or create a ReferralInvitation.
     * @example
     * // Update or create a ReferralInvitation
     * const referralInvitation = await prisma.referralInvitation.upsert({
     *   create: {
     *     // ... data to create a ReferralInvitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReferralInvitation we want to update
     *   }
     * })
     */
    upsert<T extends ReferralInvitationUpsertArgs>(args: SelectSubset<T, ReferralInvitationUpsertArgs<ExtArgs>>): Prisma__ReferralInvitationClient<$Result.GetResult<Prisma.$ReferralInvitationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReferralInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralInvitationCountArgs} args - Arguments to filter ReferralInvitations to count.
     * @example
     * // Count the number of ReferralInvitations
     * const count = await prisma.referralInvitation.count({
     *   where: {
     *     // ... the filter for the ReferralInvitations we want to count
     *   }
     * })
    **/
    count<T extends ReferralInvitationCountArgs>(
      args?: Subset<T, ReferralInvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReferralInvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReferralInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralInvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReferralInvitationAggregateArgs>(args: Subset<T, ReferralInvitationAggregateArgs>): Prisma.PrismaPromise<GetReferralInvitationAggregateType<T>>

    /**
     * Group by ReferralInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralInvitationGroupByArgs} args - Group by arguments.
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
      T extends ReferralInvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralInvitationGroupByArgs['orderBy'] }
        : { orderBy?: ReferralInvitationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReferralInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferralInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReferralInvitation model
   */
  readonly fields: ReferralInvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReferralInvitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralInvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inviter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    candidate<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    jobPost<T extends ReferralInvitation$jobPostArgs<ExtArgs> = {}>(args?: Subset<T, ReferralInvitation$jobPostArgs<ExtArgs>>): Prisma__JobPostClient<$Result.GetResult<Prisma.$JobPostPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the ReferralInvitation model
   */ 
  interface ReferralInvitationFieldRefs {
    readonly id: FieldRef<"ReferralInvitation", 'String'>
    readonly inviterId: FieldRef<"ReferralInvitation", 'String'>
    readonly candidateId: FieldRef<"ReferralInvitation", 'String'>
    readonly jobPostId: FieldRef<"ReferralInvitation", 'String'>
    readonly status: FieldRef<"ReferralInvitation", 'String'>
    readonly createdAt: FieldRef<"ReferralInvitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReferralInvitation findUnique
   */
  export type ReferralInvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralInvitation to fetch.
     */
    where: ReferralInvitationWhereUniqueInput
  }

  /**
   * ReferralInvitation findUniqueOrThrow
   */
  export type ReferralInvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralInvitation to fetch.
     */
    where: ReferralInvitationWhereUniqueInput
  }

  /**
   * ReferralInvitation findFirst
   */
  export type ReferralInvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralInvitation to fetch.
     */
    where?: ReferralInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralInvitations to fetch.
     */
    orderBy?: ReferralInvitationOrderByWithRelationInput | ReferralInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralInvitations.
     */
    cursor?: ReferralInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralInvitations.
     */
    distinct?: ReferralInvitationScalarFieldEnum | ReferralInvitationScalarFieldEnum[]
  }

  /**
   * ReferralInvitation findFirstOrThrow
   */
  export type ReferralInvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralInvitation to fetch.
     */
    where?: ReferralInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralInvitations to fetch.
     */
    orderBy?: ReferralInvitationOrderByWithRelationInput | ReferralInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReferralInvitations.
     */
    cursor?: ReferralInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReferralInvitations.
     */
    distinct?: ReferralInvitationScalarFieldEnum | ReferralInvitationScalarFieldEnum[]
  }

  /**
   * ReferralInvitation findMany
   */
  export type ReferralInvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    /**
     * Filter, which ReferralInvitations to fetch.
     */
    where?: ReferralInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReferralInvitations to fetch.
     */
    orderBy?: ReferralInvitationOrderByWithRelationInput | ReferralInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReferralInvitations.
     */
    cursor?: ReferralInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReferralInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReferralInvitations.
     */
    skip?: number
    distinct?: ReferralInvitationScalarFieldEnum | ReferralInvitationScalarFieldEnum[]
  }

  /**
   * ReferralInvitation create
   */
  export type ReferralInvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a ReferralInvitation.
     */
    data: XOR<ReferralInvitationCreateInput, ReferralInvitationUncheckedCreateInput>
  }

  /**
   * ReferralInvitation createMany
   */
  export type ReferralInvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReferralInvitations.
     */
    data: ReferralInvitationCreateManyInput | ReferralInvitationCreateManyInput[]
  }

  /**
   * ReferralInvitation createManyAndReturn
   */
  export type ReferralInvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReferralInvitations.
     */
    data: ReferralInvitationCreateManyInput | ReferralInvitationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReferralInvitation update
   */
  export type ReferralInvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a ReferralInvitation.
     */
    data: XOR<ReferralInvitationUpdateInput, ReferralInvitationUncheckedUpdateInput>
    /**
     * Choose, which ReferralInvitation to update.
     */
    where: ReferralInvitationWhereUniqueInput
  }

  /**
   * ReferralInvitation updateMany
   */
  export type ReferralInvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReferralInvitations.
     */
    data: XOR<ReferralInvitationUpdateManyMutationInput, ReferralInvitationUncheckedUpdateManyInput>
    /**
     * Filter which ReferralInvitations to update
     */
    where?: ReferralInvitationWhereInput
  }

  /**
   * ReferralInvitation upsert
   */
  export type ReferralInvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the ReferralInvitation to update in case it exists.
     */
    where: ReferralInvitationWhereUniqueInput
    /**
     * In case the ReferralInvitation found by the `where` argument doesn't exist, create a new ReferralInvitation with this data.
     */
    create: XOR<ReferralInvitationCreateInput, ReferralInvitationUncheckedCreateInput>
    /**
     * In case the ReferralInvitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralInvitationUpdateInput, ReferralInvitationUncheckedUpdateInput>
  }

  /**
   * ReferralInvitation delete
   */
  export type ReferralInvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
    /**
     * Filter which ReferralInvitation to delete.
     */
    where: ReferralInvitationWhereUniqueInput
  }

  /**
   * ReferralInvitation deleteMany
   */
  export type ReferralInvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReferralInvitations to delete
     */
    where?: ReferralInvitationWhereInput
  }

  /**
   * ReferralInvitation.jobPost
   */
  export type ReferralInvitation$jobPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPost
     */
    select?: JobPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostInclude<ExtArgs> | null
    where?: JobPostWhereInput
  }

  /**
   * ReferralInvitation without action
   */
  export type ReferralInvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralInvitation
     */
    select?: ReferralInvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInvitationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    resetPasswordToken: 'resetPasswordToken',
    resetPasswordExpires: 'resetPasswordExpires',
    welcomeEmailSent: 'welcomeEmailSent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    logo: 'logo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const EmployeeProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    companyId: 'companyId',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeProfileScalarFieldEnum = (typeof EmployeeProfileScalarFieldEnum)[keyof typeof EmployeeProfileScalarFieldEnum]


  export const JobPostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    companyName: 'companyName',
    description: 'description',
    experience: 'experience',
    location: 'location',
    skills: 'skills',
    companyId: 'companyId',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobPostScalarFieldEnum = (typeof JobPostScalarFieldEnum)[keyof typeof JobPostScalarFieldEnum]


  export const JobCustomFormFieldScalarFieldEnum: {
    id: 'id',
    jobPostId: 'jobPostId',
    label: 'label',
    type: 'type',
    required: 'required',
    order: 'order'
  };

  export type JobCustomFormFieldScalarFieldEnum = (typeof JobCustomFormFieldScalarFieldEnum)[keyof typeof JobCustomFormFieldScalarFieldEnum]


  export const ReferralApplicationScalarFieldEnum: {
    id: 'id',
    jobPostId: 'jobPostId',
    userId: 'userId',
    employeeId: 'employeeId',
    status: 'status',
    formData: 'formData',
    resumeUrl: 'resumeUrl',
    deleted: 'deleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReferralApplicationScalarFieldEnum = (typeof ReferralApplicationScalarFieldEnum)[keyof typeof ReferralApplicationScalarFieldEnum]


  export const ReferralFormScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    formTitle: 'formTitle',
    fields: 'fields',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReferralFormScalarFieldEnum = (typeof ReferralFormScalarFieldEnum)[keyof typeof ReferralFormScalarFieldEnum]


  export const JobSeekerProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    email: 'email',
    experience: 'experience',
    primaryRole: 'primaryRole',
    skills: 'skills',
    jobPreferences: 'jobPreferences',
    preferredLocations: 'preferredLocations',
    profileSummary: 'profileSummary',
    resumeUrl: 'resumeUrl',
    profileImageURL: 'profileImageURL',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobSeekerProfileScalarFieldEnum = (typeof JobSeekerProfileScalarFieldEnum)[keyof typeof JobSeekerProfileScalarFieldEnum]


  export const ReferralInvitationScalarFieldEnum: {
    id: 'id',
    inviterId: 'inviterId',
    candidateId: 'candidateId',
    jobPostId: 'jobPostId',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ReferralInvitationScalarFieldEnum = (typeof ReferralInvitationScalarFieldEnum)[keyof typeof ReferralInvitationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringNullableFilter<"User"> | string | null
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    welcomeEmailSent?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    employeeProfile?: XOR<EmployeeProfileNullableRelationFilter, EmployeeProfileWhereInput> | null
    jobSeekerProfile?: XOR<JobSeekerProfileNullableRelationFilter, JobSeekerProfileWhereInput> | null
    applications?: ReferralApplicationListRelationFilter
    jobPosts?: JobPostListRelationFilter
    referralForm?: XOR<ReferralFormNullableRelationFilter, ReferralFormWhereInput> | null
    sentInvitations?: ReferralInvitationListRelationFilter
    receivedInvitations?: ReferralInvitationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrderInput | SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordExpires?: SortOrderInput | SortOrder
    welcomeEmailSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employeeProfile?: EmployeeProfileOrderByWithRelationInput
    jobSeekerProfile?: JobSeekerProfileOrderByWithRelationInput
    applications?: ReferralApplicationOrderByRelationAggregateInput
    jobPosts?: JobPostOrderByRelationAggregateInput
    referralForm?: ReferralFormOrderByWithRelationInput
    sentInvitations?: ReferralInvitationOrderByRelationAggregateInput
    receivedInvitations?: ReferralInvitationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringNullableFilter<"User"> | string | null
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    welcomeEmailSent?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    employeeProfile?: XOR<EmployeeProfileNullableRelationFilter, EmployeeProfileWhereInput> | null
    jobSeekerProfile?: XOR<JobSeekerProfileNullableRelationFilter, JobSeekerProfileWhereInput> | null
    applications?: ReferralApplicationListRelationFilter
    jobPosts?: JobPostListRelationFilter
    referralForm?: XOR<ReferralFormNullableRelationFilter, ReferralFormWhereInput> | null
    sentInvitations?: ReferralInvitationListRelationFilter
    receivedInvitations?: ReferralInvitationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrderInput | SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordExpires?: SortOrderInput | SortOrder
    welcomeEmailSent?: SortOrder
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
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetPasswordToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    welcomeEmailSent?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    description?: StringNullableFilter<"Company"> | string | null
    logo?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    employees?: EmployeeProfileListRelationFilter
    jobPosts?: JobPostListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employees?: EmployeeProfileOrderByRelationAggregateInput
    jobPosts?: JobPostOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    description?: StringNullableFilter<"Company"> | string | null
    logo?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    employees?: EmployeeProfileListRelationFilter
    jobPosts?: JobPostListRelationFilter
  }, "id">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    description?: StringNullableWithAggregatesFilter<"Company"> | string | null
    logo?: StringNullableWithAggregatesFilter<"Company"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type EmployeeProfileWhereInput = {
    AND?: EmployeeProfileWhereInput | EmployeeProfileWhereInput[]
    OR?: EmployeeProfileWhereInput[]
    NOT?: EmployeeProfileWhereInput | EmployeeProfileWhereInput[]
    id?: StringFilter<"EmployeeProfile"> | string
    userId?: StringFilter<"EmployeeProfile"> | string
    companyId?: StringFilter<"EmployeeProfile"> | string
    position?: StringNullableFilter<"EmployeeProfile"> | string | null
    createdAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
  }

  export type EmployeeProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
  }

  export type EmployeeProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: EmployeeProfileWhereInput | EmployeeProfileWhereInput[]
    OR?: EmployeeProfileWhereInput[]
    NOT?: EmployeeProfileWhereInput | EmployeeProfileWhereInput[]
    companyId?: StringFilter<"EmployeeProfile"> | string
    position?: StringNullableFilter<"EmployeeProfile"> | string | null
    createdAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
  }, "id" | "userId">

  export type EmployeeProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeProfileCountOrderByAggregateInput
    _max?: EmployeeProfileMaxOrderByAggregateInput
    _min?: EmployeeProfileMinOrderByAggregateInput
  }

  export type EmployeeProfileScalarWhereWithAggregatesInput = {
    AND?: EmployeeProfileScalarWhereWithAggregatesInput | EmployeeProfileScalarWhereWithAggregatesInput[]
    OR?: EmployeeProfileScalarWhereWithAggregatesInput[]
    NOT?: EmployeeProfileScalarWhereWithAggregatesInput | EmployeeProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeProfile"> | string
    userId?: StringWithAggregatesFilter<"EmployeeProfile"> | string
    companyId?: StringWithAggregatesFilter<"EmployeeProfile"> | string
    position?: StringNullableWithAggregatesFilter<"EmployeeProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EmployeeProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmployeeProfile"> | Date | string
  }

  export type JobPostWhereInput = {
    AND?: JobPostWhereInput | JobPostWhereInput[]
    OR?: JobPostWhereInput[]
    NOT?: JobPostWhereInput | JobPostWhereInput[]
    id?: StringFilter<"JobPost"> | string
    title?: StringFilter<"JobPost"> | string
    companyName?: StringFilter<"JobPost"> | string
    description?: StringNullableFilter<"JobPost"> | string | null
    experience?: IntNullableFilter<"JobPost"> | number | null
    location?: StringNullableFilter<"JobPost"> | string | null
    skills?: StringNullableFilter<"JobPost"> | string | null
    companyId?: StringFilter<"JobPost"> | string
    userId?: StringFilter<"JobPost"> | string
    createdAt?: DateTimeFilter<"JobPost"> | Date | string
    updatedAt?: DateTimeFilter<"JobPost"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    customFormFields?: JobCustomFormFieldListRelationFilter
    applications?: ReferralApplicationListRelationFilter
    referralInvitations?: ReferralInvitationListRelationFilter
  }

  export type JobPostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    companyName?: SortOrder
    description?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    companyId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    customFormFields?: JobCustomFormFieldOrderByRelationAggregateInput
    applications?: ReferralApplicationOrderByRelationAggregateInput
    referralInvitations?: ReferralInvitationOrderByRelationAggregateInput
  }

  export type JobPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobPostWhereInput | JobPostWhereInput[]
    OR?: JobPostWhereInput[]
    NOT?: JobPostWhereInput | JobPostWhereInput[]
    title?: StringFilter<"JobPost"> | string
    companyName?: StringFilter<"JobPost"> | string
    description?: StringNullableFilter<"JobPost"> | string | null
    experience?: IntNullableFilter<"JobPost"> | number | null
    location?: StringNullableFilter<"JobPost"> | string | null
    skills?: StringNullableFilter<"JobPost"> | string | null
    companyId?: StringFilter<"JobPost"> | string
    userId?: StringFilter<"JobPost"> | string
    createdAt?: DateTimeFilter<"JobPost"> | Date | string
    updatedAt?: DateTimeFilter<"JobPost"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    customFormFields?: JobCustomFormFieldListRelationFilter
    applications?: ReferralApplicationListRelationFilter
    referralInvitations?: ReferralInvitationListRelationFilter
  }, "id">

  export type JobPostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    companyName?: SortOrder
    description?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    companyId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobPostCountOrderByAggregateInput
    _avg?: JobPostAvgOrderByAggregateInput
    _max?: JobPostMaxOrderByAggregateInput
    _min?: JobPostMinOrderByAggregateInput
    _sum?: JobPostSumOrderByAggregateInput
  }

  export type JobPostScalarWhereWithAggregatesInput = {
    AND?: JobPostScalarWhereWithAggregatesInput | JobPostScalarWhereWithAggregatesInput[]
    OR?: JobPostScalarWhereWithAggregatesInput[]
    NOT?: JobPostScalarWhereWithAggregatesInput | JobPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobPost"> | string
    title?: StringWithAggregatesFilter<"JobPost"> | string
    companyName?: StringWithAggregatesFilter<"JobPost"> | string
    description?: StringNullableWithAggregatesFilter<"JobPost"> | string | null
    experience?: IntNullableWithAggregatesFilter<"JobPost"> | number | null
    location?: StringNullableWithAggregatesFilter<"JobPost"> | string | null
    skills?: StringNullableWithAggregatesFilter<"JobPost"> | string | null
    companyId?: StringWithAggregatesFilter<"JobPost"> | string
    userId?: StringWithAggregatesFilter<"JobPost"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JobPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobPost"> | Date | string
  }

  export type JobCustomFormFieldWhereInput = {
    AND?: JobCustomFormFieldWhereInput | JobCustomFormFieldWhereInput[]
    OR?: JobCustomFormFieldWhereInput[]
    NOT?: JobCustomFormFieldWhereInput | JobCustomFormFieldWhereInput[]
    id?: StringFilter<"JobCustomFormField"> | string
    jobPostId?: StringFilter<"JobCustomFormField"> | string
    label?: StringFilter<"JobCustomFormField"> | string
    type?: StringFilter<"JobCustomFormField"> | string
    required?: BoolFilter<"JobCustomFormField"> | boolean
    order?: IntFilter<"JobCustomFormField"> | number
    jobPost?: XOR<JobPostRelationFilter, JobPostWhereInput>
  }

  export type JobCustomFormFieldOrderByWithRelationInput = {
    id?: SortOrder
    jobPostId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
    order?: SortOrder
    jobPost?: JobPostOrderByWithRelationInput
  }

  export type JobCustomFormFieldWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobCustomFormFieldWhereInput | JobCustomFormFieldWhereInput[]
    OR?: JobCustomFormFieldWhereInput[]
    NOT?: JobCustomFormFieldWhereInput | JobCustomFormFieldWhereInput[]
    jobPostId?: StringFilter<"JobCustomFormField"> | string
    label?: StringFilter<"JobCustomFormField"> | string
    type?: StringFilter<"JobCustomFormField"> | string
    required?: BoolFilter<"JobCustomFormField"> | boolean
    order?: IntFilter<"JobCustomFormField"> | number
    jobPost?: XOR<JobPostRelationFilter, JobPostWhereInput>
  }, "id">

  export type JobCustomFormFieldOrderByWithAggregationInput = {
    id?: SortOrder
    jobPostId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
    order?: SortOrder
    _count?: JobCustomFormFieldCountOrderByAggregateInput
    _avg?: JobCustomFormFieldAvgOrderByAggregateInput
    _max?: JobCustomFormFieldMaxOrderByAggregateInput
    _min?: JobCustomFormFieldMinOrderByAggregateInput
    _sum?: JobCustomFormFieldSumOrderByAggregateInput
  }

  export type JobCustomFormFieldScalarWhereWithAggregatesInput = {
    AND?: JobCustomFormFieldScalarWhereWithAggregatesInput | JobCustomFormFieldScalarWhereWithAggregatesInput[]
    OR?: JobCustomFormFieldScalarWhereWithAggregatesInput[]
    NOT?: JobCustomFormFieldScalarWhereWithAggregatesInput | JobCustomFormFieldScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobCustomFormField"> | string
    jobPostId?: StringWithAggregatesFilter<"JobCustomFormField"> | string
    label?: StringWithAggregatesFilter<"JobCustomFormField"> | string
    type?: StringWithAggregatesFilter<"JobCustomFormField"> | string
    required?: BoolWithAggregatesFilter<"JobCustomFormField"> | boolean
    order?: IntWithAggregatesFilter<"JobCustomFormField"> | number
  }

  export type ReferralApplicationWhereInput = {
    AND?: ReferralApplicationWhereInput | ReferralApplicationWhereInput[]
    OR?: ReferralApplicationWhereInput[]
    NOT?: ReferralApplicationWhereInput | ReferralApplicationWhereInput[]
    id?: StringFilter<"ReferralApplication"> | string
    jobPostId?: StringNullableFilter<"ReferralApplication"> | string | null
    userId?: StringFilter<"ReferralApplication"> | string
    employeeId?: StringFilter<"ReferralApplication"> | string
    status?: StringFilter<"ReferralApplication"> | string
    formData?: StringFilter<"ReferralApplication"> | string
    resumeUrl?: StringNullableFilter<"ReferralApplication"> | string | null
    deleted?: BoolFilter<"ReferralApplication"> | boolean
    createdAt?: DateTimeFilter<"ReferralApplication"> | Date | string
    updatedAt?: DateTimeFilter<"ReferralApplication"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    jobPost?: XOR<JobPostNullableRelationFilter, JobPostWhereInput> | null
  }

  export type ReferralApplicationOrderByWithRelationInput = {
    id?: SortOrder
    jobPostId?: SortOrderInput | SortOrder
    userId?: SortOrder
    employeeId?: SortOrder
    status?: SortOrder
    formData?: SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    jobPost?: JobPostOrderByWithRelationInput
  }

  export type ReferralApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jobPostId_userId?: ReferralApplicationJobPostIdUserIdCompoundUniqueInput
    AND?: ReferralApplicationWhereInput | ReferralApplicationWhereInput[]
    OR?: ReferralApplicationWhereInput[]
    NOT?: ReferralApplicationWhereInput | ReferralApplicationWhereInput[]
    jobPostId?: StringNullableFilter<"ReferralApplication"> | string | null
    userId?: StringFilter<"ReferralApplication"> | string
    employeeId?: StringFilter<"ReferralApplication"> | string
    status?: StringFilter<"ReferralApplication"> | string
    formData?: StringFilter<"ReferralApplication"> | string
    resumeUrl?: StringNullableFilter<"ReferralApplication"> | string | null
    deleted?: BoolFilter<"ReferralApplication"> | boolean
    createdAt?: DateTimeFilter<"ReferralApplication"> | Date | string
    updatedAt?: DateTimeFilter<"ReferralApplication"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    jobPost?: XOR<JobPostNullableRelationFilter, JobPostWhereInput> | null
  }, "id" | "jobPostId_userId">

  export type ReferralApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    jobPostId?: SortOrderInput | SortOrder
    userId?: SortOrder
    employeeId?: SortOrder
    status?: SortOrder
    formData?: SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReferralApplicationCountOrderByAggregateInput
    _max?: ReferralApplicationMaxOrderByAggregateInput
    _min?: ReferralApplicationMinOrderByAggregateInput
  }

  export type ReferralApplicationScalarWhereWithAggregatesInput = {
    AND?: ReferralApplicationScalarWhereWithAggregatesInput | ReferralApplicationScalarWhereWithAggregatesInput[]
    OR?: ReferralApplicationScalarWhereWithAggregatesInput[]
    NOT?: ReferralApplicationScalarWhereWithAggregatesInput | ReferralApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReferralApplication"> | string
    jobPostId?: StringNullableWithAggregatesFilter<"ReferralApplication"> | string | null
    userId?: StringWithAggregatesFilter<"ReferralApplication"> | string
    employeeId?: StringWithAggregatesFilter<"ReferralApplication"> | string
    status?: StringWithAggregatesFilter<"ReferralApplication"> | string
    formData?: StringWithAggregatesFilter<"ReferralApplication"> | string
    resumeUrl?: StringNullableWithAggregatesFilter<"ReferralApplication"> | string | null
    deleted?: BoolWithAggregatesFilter<"ReferralApplication"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ReferralApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReferralApplication"> | Date | string
  }

  export type ReferralFormWhereInput = {
    AND?: ReferralFormWhereInput | ReferralFormWhereInput[]
    OR?: ReferralFormWhereInput[]
    NOT?: ReferralFormWhereInput | ReferralFormWhereInput[]
    id?: StringFilter<"ReferralForm"> | string
    userId?: StringFilter<"ReferralForm"> | string
    formTitle?: StringFilter<"ReferralForm"> | string
    fields?: StringFilter<"ReferralForm"> | string
    createdAt?: DateTimeFilter<"ReferralForm"> | Date | string
    updatedAt?: DateTimeFilter<"ReferralForm"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReferralFormOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    formTitle?: SortOrder
    fields?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ReferralFormWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ReferralFormWhereInput | ReferralFormWhereInput[]
    OR?: ReferralFormWhereInput[]
    NOT?: ReferralFormWhereInput | ReferralFormWhereInput[]
    formTitle?: StringFilter<"ReferralForm"> | string
    fields?: StringFilter<"ReferralForm"> | string
    createdAt?: DateTimeFilter<"ReferralForm"> | Date | string
    updatedAt?: DateTimeFilter<"ReferralForm"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ReferralFormOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    formTitle?: SortOrder
    fields?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReferralFormCountOrderByAggregateInput
    _max?: ReferralFormMaxOrderByAggregateInput
    _min?: ReferralFormMinOrderByAggregateInput
  }

  export type ReferralFormScalarWhereWithAggregatesInput = {
    AND?: ReferralFormScalarWhereWithAggregatesInput | ReferralFormScalarWhereWithAggregatesInput[]
    OR?: ReferralFormScalarWhereWithAggregatesInput[]
    NOT?: ReferralFormScalarWhereWithAggregatesInput | ReferralFormScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReferralForm"> | string
    userId?: StringWithAggregatesFilter<"ReferralForm"> | string
    formTitle?: StringWithAggregatesFilter<"ReferralForm"> | string
    fields?: StringWithAggregatesFilter<"ReferralForm"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ReferralForm"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReferralForm"> | Date | string
  }

  export type JobSeekerProfileWhereInput = {
    AND?: JobSeekerProfileWhereInput | JobSeekerProfileWhereInput[]
    OR?: JobSeekerProfileWhereInput[]
    NOT?: JobSeekerProfileWhereInput | JobSeekerProfileWhereInput[]
    id?: StringFilter<"JobSeekerProfile"> | string
    userId?: StringFilter<"JobSeekerProfile"> | string
    fullName?: StringFilter<"JobSeekerProfile"> | string
    email?: StringFilter<"JobSeekerProfile"> | string
    experience?: IntNullableFilter<"JobSeekerProfile"> | number | null
    primaryRole?: StringNullableFilter<"JobSeekerProfile"> | string | null
    skills?: StringNullableFilter<"JobSeekerProfile"> | string | null
    jobPreferences?: StringNullableFilter<"JobSeekerProfile"> | string | null
    preferredLocations?: StringNullableFilter<"JobSeekerProfile"> | string | null
    profileSummary?: StringNullableFilter<"JobSeekerProfile"> | string | null
    resumeUrl?: StringNullableFilter<"JobSeekerProfile"> | string | null
    profileImageURL?: StringNullableFilter<"JobSeekerProfile"> | string | null
    createdAt?: DateTimeFilter<"JobSeekerProfile"> | Date | string
    updatedAt?: DateTimeFilter<"JobSeekerProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type JobSeekerProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    experience?: SortOrderInput | SortOrder
    primaryRole?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    jobPreferences?: SortOrderInput | SortOrder
    preferredLocations?: SortOrderInput | SortOrder
    profileSummary?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    profileImageURL?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type JobSeekerProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: JobSeekerProfileWhereInput | JobSeekerProfileWhereInput[]
    OR?: JobSeekerProfileWhereInput[]
    NOT?: JobSeekerProfileWhereInput | JobSeekerProfileWhereInput[]
    fullName?: StringFilter<"JobSeekerProfile"> | string
    email?: StringFilter<"JobSeekerProfile"> | string
    experience?: IntNullableFilter<"JobSeekerProfile"> | number | null
    primaryRole?: StringNullableFilter<"JobSeekerProfile"> | string | null
    skills?: StringNullableFilter<"JobSeekerProfile"> | string | null
    jobPreferences?: StringNullableFilter<"JobSeekerProfile"> | string | null
    preferredLocations?: StringNullableFilter<"JobSeekerProfile"> | string | null
    profileSummary?: StringNullableFilter<"JobSeekerProfile"> | string | null
    resumeUrl?: StringNullableFilter<"JobSeekerProfile"> | string | null
    profileImageURL?: StringNullableFilter<"JobSeekerProfile"> | string | null
    createdAt?: DateTimeFilter<"JobSeekerProfile"> | Date | string
    updatedAt?: DateTimeFilter<"JobSeekerProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type JobSeekerProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    experience?: SortOrderInput | SortOrder
    primaryRole?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    jobPreferences?: SortOrderInput | SortOrder
    preferredLocations?: SortOrderInput | SortOrder
    profileSummary?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    profileImageURL?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobSeekerProfileCountOrderByAggregateInput
    _avg?: JobSeekerProfileAvgOrderByAggregateInput
    _max?: JobSeekerProfileMaxOrderByAggregateInput
    _min?: JobSeekerProfileMinOrderByAggregateInput
    _sum?: JobSeekerProfileSumOrderByAggregateInput
  }

  export type JobSeekerProfileScalarWhereWithAggregatesInput = {
    AND?: JobSeekerProfileScalarWhereWithAggregatesInput | JobSeekerProfileScalarWhereWithAggregatesInput[]
    OR?: JobSeekerProfileScalarWhereWithAggregatesInput[]
    NOT?: JobSeekerProfileScalarWhereWithAggregatesInput | JobSeekerProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobSeekerProfile"> | string
    userId?: StringWithAggregatesFilter<"JobSeekerProfile"> | string
    fullName?: StringWithAggregatesFilter<"JobSeekerProfile"> | string
    email?: StringWithAggregatesFilter<"JobSeekerProfile"> | string
    experience?: IntNullableWithAggregatesFilter<"JobSeekerProfile"> | number | null
    primaryRole?: StringNullableWithAggregatesFilter<"JobSeekerProfile"> | string | null
    skills?: StringNullableWithAggregatesFilter<"JobSeekerProfile"> | string | null
    jobPreferences?: StringNullableWithAggregatesFilter<"JobSeekerProfile"> | string | null
    preferredLocations?: StringNullableWithAggregatesFilter<"JobSeekerProfile"> | string | null
    profileSummary?: StringNullableWithAggregatesFilter<"JobSeekerProfile"> | string | null
    resumeUrl?: StringNullableWithAggregatesFilter<"JobSeekerProfile"> | string | null
    profileImageURL?: StringNullableWithAggregatesFilter<"JobSeekerProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"JobSeekerProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobSeekerProfile"> | Date | string
  }

  export type ReferralInvitationWhereInput = {
    AND?: ReferralInvitationWhereInput | ReferralInvitationWhereInput[]
    OR?: ReferralInvitationWhereInput[]
    NOT?: ReferralInvitationWhereInput | ReferralInvitationWhereInput[]
    id?: StringFilter<"ReferralInvitation"> | string
    inviterId?: StringFilter<"ReferralInvitation"> | string
    candidateId?: StringFilter<"ReferralInvitation"> | string
    jobPostId?: StringNullableFilter<"ReferralInvitation"> | string | null
    status?: StringFilter<"ReferralInvitation"> | string
    createdAt?: DateTimeFilter<"ReferralInvitation"> | Date | string
    inviter?: XOR<UserRelationFilter, UserWhereInput>
    candidate?: XOR<UserRelationFilter, UserWhereInput>
    jobPost?: XOR<JobPostNullableRelationFilter, JobPostWhereInput> | null
  }

  export type ReferralInvitationOrderByWithRelationInput = {
    id?: SortOrder
    inviterId?: SortOrder
    candidateId?: SortOrder
    jobPostId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    inviter?: UserOrderByWithRelationInput
    candidate?: UserOrderByWithRelationInput
    jobPost?: JobPostOrderByWithRelationInput
  }

  export type ReferralInvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inviterId_candidateId_jobPostId?: ReferralInvitationInviterIdCandidateIdJobPostIdCompoundUniqueInput
    AND?: ReferralInvitationWhereInput | ReferralInvitationWhereInput[]
    OR?: ReferralInvitationWhereInput[]
    NOT?: ReferralInvitationWhereInput | ReferralInvitationWhereInput[]
    inviterId?: StringFilter<"ReferralInvitation"> | string
    candidateId?: StringFilter<"ReferralInvitation"> | string
    jobPostId?: StringNullableFilter<"ReferralInvitation"> | string | null
    status?: StringFilter<"ReferralInvitation"> | string
    createdAt?: DateTimeFilter<"ReferralInvitation"> | Date | string
    inviter?: XOR<UserRelationFilter, UserWhereInput>
    candidate?: XOR<UserRelationFilter, UserWhereInput>
    jobPost?: XOR<JobPostNullableRelationFilter, JobPostWhereInput> | null
  }, "id" | "inviterId_candidateId_jobPostId">

  export type ReferralInvitationOrderByWithAggregationInput = {
    id?: SortOrder
    inviterId?: SortOrder
    candidateId?: SortOrder
    jobPostId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ReferralInvitationCountOrderByAggregateInput
    _max?: ReferralInvitationMaxOrderByAggregateInput
    _min?: ReferralInvitationMinOrderByAggregateInput
  }

  export type ReferralInvitationScalarWhereWithAggregatesInput = {
    AND?: ReferralInvitationScalarWhereWithAggregatesInput | ReferralInvitationScalarWhereWithAggregatesInput[]
    OR?: ReferralInvitationScalarWhereWithAggregatesInput[]
    NOT?: ReferralInvitationScalarWhereWithAggregatesInput | ReferralInvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReferralInvitation"> | string
    inviterId?: StringWithAggregatesFilter<"ReferralInvitation"> | string
    candidateId?: StringWithAggregatesFilter<"ReferralInvitation"> | string
    jobPostId?: StringNullableWithAggregatesFilter<"ReferralInvitation"> | string | null
    status?: StringWithAggregatesFilter<"ReferralInvitation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ReferralInvitation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationCreateNestedManyWithoutUserInput
    jobPosts?: JobPostCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutUserInput
    jobPosts?: JobPostUncheckedCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormUncheckedCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUncheckedUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUncheckedUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUncheckedUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    description?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeProfileCreateNestedManyWithoutCompanyInput
    jobPosts?: JobPostCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeProfileUncheckedCreateNestedManyWithoutCompanyInput
    jobPosts?: JobPostUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeProfileUpdateManyWithoutCompanyNestedInput
    jobPosts?: JobPostUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeProfileUncheckedUpdateManyWithoutCompanyNestedInput
    jobPosts?: JobPostUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeProfileCreateInput = {
    id?: string
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeProfileInput
    company: CompanyCreateNestedOneWithoutEmployeesInput
  }

  export type EmployeeProfileUncheckedCreateInput = {
    id?: string
    userId: string
    companyId: string
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeProfileNestedInput
    company?: CompanyUpdateOneRequiredWithoutEmployeesNestedInput
  }

  export type EmployeeProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeProfileCreateManyInput = {
    id?: string
    userId: string
    companyId: string
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostCreateInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobPostsInput
    user: UserCreateNestedOneWithoutJobPostsInput
    customFormFields?: JobCustomFormFieldCreateNestedManyWithoutJobPostInput
    applications?: ReferralApplicationCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationCreateNestedManyWithoutJobPostInput
  }

  export type JobPostUncheckedCreateInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    companyId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customFormFields?: JobCustomFormFieldUncheckedCreateNestedManyWithoutJobPostInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutJobPostInput
  }

  export type JobPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobPostsNestedInput
    user?: UserUpdateOneRequiredWithoutJobPostsNestedInput
    customFormFields?: JobCustomFormFieldUpdateManyWithoutJobPostNestedInput
    applications?: ReferralApplicationUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUpdateManyWithoutJobPostNestedInput
  }

  export type JobPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customFormFields?: JobCustomFormFieldUncheckedUpdateManyWithoutJobPostNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUncheckedUpdateManyWithoutJobPostNestedInput
  }

  export type JobPostCreateManyInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    companyId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCustomFormFieldCreateInput = {
    id?: string
    label: string
    type: string
    required?: boolean
    order?: number
    jobPost: JobPostCreateNestedOneWithoutCustomFormFieldsInput
  }

  export type JobCustomFormFieldUncheckedCreateInput = {
    id?: string
    jobPostId: string
    label: string
    type: string
    required?: boolean
    order?: number
  }

  export type JobCustomFormFieldUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    jobPost?: JobPostUpdateOneRequiredWithoutCustomFormFieldsNestedInput
  }

  export type JobCustomFormFieldUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobPostId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type JobCustomFormFieldCreateManyInput = {
    id?: string
    jobPostId: string
    label: string
    type: string
    required?: boolean
    order?: number
  }

  export type JobCustomFormFieldUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type JobCustomFormFieldUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobPostId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ReferralApplicationCreateInput = {
    id?: string
    employeeId: string
    status?: string
    formData?: string
    resumeUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutApplicationsInput
    jobPost?: JobPostCreateNestedOneWithoutApplicationsInput
  }

  export type ReferralApplicationUncheckedCreateInput = {
    id?: string
    jobPostId?: string | null
    userId: string
    employeeId: string
    status?: string
    formData?: string
    resumeUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
    jobPost?: JobPostUpdateOneWithoutApplicationsNestedInput
  }

  export type ReferralApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralApplicationCreateManyInput = {
    id?: string
    jobPostId?: string | null
    userId: string
    employeeId: string
    status?: string
    formData?: string
    resumeUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralFormCreateInput = {
    id?: string
    formTitle?: string
    fields: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReferralFormInput
  }

  export type ReferralFormUncheckedCreateInput = {
    id?: string
    userId: string
    formTitle?: string
    fields: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralFormUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    formTitle?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReferralFormNestedInput
  }

  export type ReferralFormUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    formTitle?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralFormCreateManyInput = {
    id?: string
    userId: string
    formTitle?: string
    fields: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralFormUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    formTitle?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralFormUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    formTitle?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSeekerProfileCreateInput = {
    id?: string
    fullName: string
    email: string
    experience?: number | null
    primaryRole?: string | null
    skills?: string | null
    jobPreferences?: string | null
    preferredLocations?: string | null
    profileSummary?: string | null
    resumeUrl?: string | null
    profileImageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutJobSeekerProfileInput
  }

  export type JobSeekerProfileUncheckedCreateInput = {
    id?: string
    userId: string
    fullName: string
    email: string
    experience?: number | null
    primaryRole?: string | null
    skills?: string | null
    jobPreferences?: string | null
    preferredLocations?: string | null
    profileSummary?: string | null
    resumeUrl?: string | null
    profileImageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobSeekerProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    jobPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutJobSeekerProfileNestedInput
  }

  export type JobSeekerProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    jobPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSeekerProfileCreateManyInput = {
    id?: string
    userId: string
    fullName: string
    email: string
    experience?: number | null
    primaryRole?: string | null
    skills?: string | null
    jobPreferences?: string | null
    preferredLocations?: string | null
    profileSummary?: string | null
    resumeUrl?: string | null
    profileImageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobSeekerProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    jobPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSeekerProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    jobPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationCreateInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    inviter: UserCreateNestedOneWithoutSentInvitationsInput
    candidate: UserCreateNestedOneWithoutReceivedInvitationsInput
    jobPost?: JobPostCreateNestedOneWithoutReferralInvitationsInput
  }

  export type ReferralInvitationUncheckedCreateInput = {
    id?: string
    inviterId: string
    candidateId: string
    jobPostId?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type ReferralInvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviter?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
    candidate?: UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput
    jobPost?: JobPostUpdateOneWithoutReferralInvitationsNestedInput
  }

  export type ReferralInvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationCreateManyInput = {
    id?: string
    inviterId: string
    candidateId: string
    jobPostId?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type ReferralInvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
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

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EmployeeProfileNullableRelationFilter = {
    is?: EmployeeProfileWhereInput | null
    isNot?: EmployeeProfileWhereInput | null
  }

  export type JobSeekerProfileNullableRelationFilter = {
    is?: JobSeekerProfileWhereInput | null
    isNot?: JobSeekerProfileWhereInput | null
  }

  export type ReferralApplicationListRelationFilter = {
    every?: ReferralApplicationWhereInput
    some?: ReferralApplicationWhereInput
    none?: ReferralApplicationWhereInput
  }

  export type JobPostListRelationFilter = {
    every?: JobPostWhereInput
    some?: JobPostWhereInput
    none?: JobPostWhereInput
  }

  export type ReferralFormNullableRelationFilter = {
    is?: ReferralFormWhereInput | null
    isNot?: ReferralFormWhereInput | null
  }

  export type ReferralInvitationListRelationFilter = {
    every?: ReferralInvitationWhereInput
    some?: ReferralInvitationWhereInput
    none?: ReferralInvitationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReferralApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobPostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReferralInvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    welcomeEmailSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    welcomeEmailSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    welcomeEmailSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EmployeeProfileListRelationFilter = {
    every?: EmployeeProfileWhereInput
    some?: EmployeeProfileWhereInput
    none?: EmployeeProfileWhereInput
  }

  export type EmployeeProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CompanyRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type EmployeeProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type JobCustomFormFieldListRelationFilter = {
    every?: JobCustomFormFieldWhereInput
    some?: JobCustomFormFieldWhereInput
    none?: JobCustomFormFieldWhereInput
  }

  export type JobCustomFormFieldOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobPostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    companyName?: SortOrder
    description?: SortOrder
    experience?: SortOrder
    location?: SortOrder
    skills?: SortOrder
    companyId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobPostAvgOrderByAggregateInput = {
    experience?: SortOrder
  }

  export type JobPostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    companyName?: SortOrder
    description?: SortOrder
    experience?: SortOrder
    location?: SortOrder
    skills?: SortOrder
    companyId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobPostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    companyName?: SortOrder
    description?: SortOrder
    experience?: SortOrder
    location?: SortOrder
    skills?: SortOrder
    companyId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobPostSumOrderByAggregateInput = {
    experience?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type JobPostRelationFilter = {
    is?: JobPostWhereInput
    isNot?: JobPostWhereInput
  }

  export type JobCustomFormFieldCountOrderByAggregateInput = {
    id?: SortOrder
    jobPostId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
    order?: SortOrder
  }

  export type JobCustomFormFieldAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type JobCustomFormFieldMaxOrderByAggregateInput = {
    id?: SortOrder
    jobPostId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
    order?: SortOrder
  }

  export type JobCustomFormFieldMinOrderByAggregateInput = {
    id?: SortOrder
    jobPostId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    required?: SortOrder
    order?: SortOrder
  }

  export type JobCustomFormFieldSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type JobPostNullableRelationFilter = {
    is?: JobPostWhereInput | null
    isNot?: JobPostWhereInput | null
  }

  export type ReferralApplicationJobPostIdUserIdCompoundUniqueInput = {
    jobPostId: string
    userId: string
  }

  export type ReferralApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    jobPostId?: SortOrder
    userId?: SortOrder
    employeeId?: SortOrder
    status?: SortOrder
    formData?: SortOrder
    resumeUrl?: SortOrder
    deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    jobPostId?: SortOrder
    userId?: SortOrder
    employeeId?: SortOrder
    status?: SortOrder
    formData?: SortOrder
    resumeUrl?: SortOrder
    deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    jobPostId?: SortOrder
    userId?: SortOrder
    employeeId?: SortOrder
    status?: SortOrder
    formData?: SortOrder
    resumeUrl?: SortOrder
    deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralFormCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    formTitle?: SortOrder
    fields?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralFormMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    formTitle?: SortOrder
    fields?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReferralFormMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    formTitle?: SortOrder
    fields?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSeekerProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    experience?: SortOrder
    primaryRole?: SortOrder
    skills?: SortOrder
    jobPreferences?: SortOrder
    preferredLocations?: SortOrder
    profileSummary?: SortOrder
    resumeUrl?: SortOrder
    profileImageURL?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSeekerProfileAvgOrderByAggregateInput = {
    experience?: SortOrder
  }

  export type JobSeekerProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    experience?: SortOrder
    primaryRole?: SortOrder
    skills?: SortOrder
    jobPreferences?: SortOrder
    preferredLocations?: SortOrder
    profileSummary?: SortOrder
    resumeUrl?: SortOrder
    profileImageURL?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSeekerProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    experience?: SortOrder
    primaryRole?: SortOrder
    skills?: SortOrder
    jobPreferences?: SortOrder
    preferredLocations?: SortOrder
    profileSummary?: SortOrder
    resumeUrl?: SortOrder
    profileImageURL?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSeekerProfileSumOrderByAggregateInput = {
    experience?: SortOrder
  }

  export type ReferralInvitationInviterIdCandidateIdJobPostIdCompoundUniqueInput = {
    inviterId: string
    candidateId: string
    jobPostId: string
  }

  export type ReferralInvitationCountOrderByAggregateInput = {
    id?: SortOrder
    inviterId?: SortOrder
    candidateId?: SortOrder
    jobPostId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ReferralInvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    inviterId?: SortOrder
    candidateId?: SortOrder
    jobPostId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ReferralInvitationMinOrderByAggregateInput = {
    id?: SortOrder
    inviterId?: SortOrder
    candidateId?: SortOrder
    jobPostId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutUserInput
    connect?: EmployeeProfileWhereUniqueInput
  }

  export type JobSeekerProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<JobSeekerProfileCreateWithoutUserInput, JobSeekerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: JobSeekerProfileCreateOrConnectWithoutUserInput
    connect?: JobSeekerProfileWhereUniqueInput
  }

  export type ReferralApplicationCreateNestedManyWithoutUserInput = {
    create?: XOR<ReferralApplicationCreateWithoutUserInput, ReferralApplicationUncheckedCreateWithoutUserInput> | ReferralApplicationCreateWithoutUserInput[] | ReferralApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralApplicationCreateOrConnectWithoutUserInput | ReferralApplicationCreateOrConnectWithoutUserInput[]
    createMany?: ReferralApplicationCreateManyUserInputEnvelope
    connect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
  }

  export type JobPostCreateNestedManyWithoutUserInput = {
    create?: XOR<JobPostCreateWithoutUserInput, JobPostUncheckedCreateWithoutUserInput> | JobPostCreateWithoutUserInput[] | JobPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobPostCreateOrConnectWithoutUserInput | JobPostCreateOrConnectWithoutUserInput[]
    createMany?: JobPostCreateManyUserInputEnvelope
    connect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
  }

  export type ReferralFormCreateNestedOneWithoutUserInput = {
    create?: XOR<ReferralFormCreateWithoutUserInput, ReferralFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: ReferralFormCreateOrConnectWithoutUserInput
    connect?: ReferralFormWhereUniqueInput
  }

  export type ReferralInvitationCreateNestedManyWithoutInviterInput = {
    create?: XOR<ReferralInvitationCreateWithoutInviterInput, ReferralInvitationUncheckedCreateWithoutInviterInput> | ReferralInvitationCreateWithoutInviterInput[] | ReferralInvitationUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutInviterInput | ReferralInvitationCreateOrConnectWithoutInviterInput[]
    createMany?: ReferralInvitationCreateManyInviterInputEnvelope
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
  }

  export type ReferralInvitationCreateNestedManyWithoutCandidateInput = {
    create?: XOR<ReferralInvitationCreateWithoutCandidateInput, ReferralInvitationUncheckedCreateWithoutCandidateInput> | ReferralInvitationCreateWithoutCandidateInput[] | ReferralInvitationUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutCandidateInput | ReferralInvitationCreateOrConnectWithoutCandidateInput[]
    createMany?: ReferralInvitationCreateManyCandidateInputEnvelope
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
  }

  export type EmployeeProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutUserInput
    connect?: EmployeeProfileWhereUniqueInput
  }

  export type JobSeekerProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<JobSeekerProfileCreateWithoutUserInput, JobSeekerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: JobSeekerProfileCreateOrConnectWithoutUserInput
    connect?: JobSeekerProfileWhereUniqueInput
  }

  export type ReferralApplicationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReferralApplicationCreateWithoutUserInput, ReferralApplicationUncheckedCreateWithoutUserInput> | ReferralApplicationCreateWithoutUserInput[] | ReferralApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralApplicationCreateOrConnectWithoutUserInput | ReferralApplicationCreateOrConnectWithoutUserInput[]
    createMany?: ReferralApplicationCreateManyUserInputEnvelope
    connect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
  }

  export type JobPostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<JobPostCreateWithoutUserInput, JobPostUncheckedCreateWithoutUserInput> | JobPostCreateWithoutUserInput[] | JobPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobPostCreateOrConnectWithoutUserInput | JobPostCreateOrConnectWithoutUserInput[]
    createMany?: JobPostCreateManyUserInputEnvelope
    connect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
  }

  export type ReferralFormUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ReferralFormCreateWithoutUserInput, ReferralFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: ReferralFormCreateOrConnectWithoutUserInput
    connect?: ReferralFormWhereUniqueInput
  }

  export type ReferralInvitationUncheckedCreateNestedManyWithoutInviterInput = {
    create?: XOR<ReferralInvitationCreateWithoutInviterInput, ReferralInvitationUncheckedCreateWithoutInviterInput> | ReferralInvitationCreateWithoutInviterInput[] | ReferralInvitationUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutInviterInput | ReferralInvitationCreateOrConnectWithoutInviterInput[]
    createMany?: ReferralInvitationCreateManyInviterInputEnvelope
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
  }

  export type ReferralInvitationUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<ReferralInvitationCreateWithoutCandidateInput, ReferralInvitationUncheckedCreateWithoutCandidateInput> | ReferralInvitationCreateWithoutCandidateInput[] | ReferralInvitationUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutCandidateInput | ReferralInvitationCreateOrConnectWithoutCandidateInput[]
    createMany?: ReferralInvitationCreateManyCandidateInputEnvelope
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmployeeProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutUserInput
    upsert?: EmployeeProfileUpsertWithoutUserInput
    disconnect?: EmployeeProfileWhereInput | boolean
    delete?: EmployeeProfileWhereInput | boolean
    connect?: EmployeeProfileWhereUniqueInput
    update?: XOR<XOR<EmployeeProfileUpdateToOneWithWhereWithoutUserInput, EmployeeProfileUpdateWithoutUserInput>, EmployeeProfileUncheckedUpdateWithoutUserInput>
  }

  export type JobSeekerProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<JobSeekerProfileCreateWithoutUserInput, JobSeekerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: JobSeekerProfileCreateOrConnectWithoutUserInput
    upsert?: JobSeekerProfileUpsertWithoutUserInput
    disconnect?: JobSeekerProfileWhereInput | boolean
    delete?: JobSeekerProfileWhereInput | boolean
    connect?: JobSeekerProfileWhereUniqueInput
    update?: XOR<XOR<JobSeekerProfileUpdateToOneWithWhereWithoutUserInput, JobSeekerProfileUpdateWithoutUserInput>, JobSeekerProfileUncheckedUpdateWithoutUserInput>
  }

  export type ReferralApplicationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReferralApplicationCreateWithoutUserInput, ReferralApplicationUncheckedCreateWithoutUserInput> | ReferralApplicationCreateWithoutUserInput[] | ReferralApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralApplicationCreateOrConnectWithoutUserInput | ReferralApplicationCreateOrConnectWithoutUserInput[]
    upsert?: ReferralApplicationUpsertWithWhereUniqueWithoutUserInput | ReferralApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReferralApplicationCreateManyUserInputEnvelope
    set?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    disconnect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    delete?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    connect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    update?: ReferralApplicationUpdateWithWhereUniqueWithoutUserInput | ReferralApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReferralApplicationUpdateManyWithWhereWithoutUserInput | ReferralApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReferralApplicationScalarWhereInput | ReferralApplicationScalarWhereInput[]
  }

  export type JobPostUpdateManyWithoutUserNestedInput = {
    create?: XOR<JobPostCreateWithoutUserInput, JobPostUncheckedCreateWithoutUserInput> | JobPostCreateWithoutUserInput[] | JobPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobPostCreateOrConnectWithoutUserInput | JobPostCreateOrConnectWithoutUserInput[]
    upsert?: JobPostUpsertWithWhereUniqueWithoutUserInput | JobPostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JobPostCreateManyUserInputEnvelope
    set?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    disconnect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    delete?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    connect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    update?: JobPostUpdateWithWhereUniqueWithoutUserInput | JobPostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JobPostUpdateManyWithWhereWithoutUserInput | JobPostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JobPostScalarWhereInput | JobPostScalarWhereInput[]
  }

  export type ReferralFormUpdateOneWithoutUserNestedInput = {
    create?: XOR<ReferralFormCreateWithoutUserInput, ReferralFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: ReferralFormCreateOrConnectWithoutUserInput
    upsert?: ReferralFormUpsertWithoutUserInput
    disconnect?: ReferralFormWhereInput | boolean
    delete?: ReferralFormWhereInput | boolean
    connect?: ReferralFormWhereUniqueInput
    update?: XOR<XOR<ReferralFormUpdateToOneWithWhereWithoutUserInput, ReferralFormUpdateWithoutUserInput>, ReferralFormUncheckedUpdateWithoutUserInput>
  }

  export type ReferralInvitationUpdateManyWithoutInviterNestedInput = {
    create?: XOR<ReferralInvitationCreateWithoutInviterInput, ReferralInvitationUncheckedCreateWithoutInviterInput> | ReferralInvitationCreateWithoutInviterInput[] | ReferralInvitationUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutInviterInput | ReferralInvitationCreateOrConnectWithoutInviterInput[]
    upsert?: ReferralInvitationUpsertWithWhereUniqueWithoutInviterInput | ReferralInvitationUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: ReferralInvitationCreateManyInviterInputEnvelope
    set?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    disconnect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    delete?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    update?: ReferralInvitationUpdateWithWhereUniqueWithoutInviterInput | ReferralInvitationUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: ReferralInvitationUpdateManyWithWhereWithoutInviterInput | ReferralInvitationUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: ReferralInvitationScalarWhereInput | ReferralInvitationScalarWhereInput[]
  }

  export type ReferralInvitationUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<ReferralInvitationCreateWithoutCandidateInput, ReferralInvitationUncheckedCreateWithoutCandidateInput> | ReferralInvitationCreateWithoutCandidateInput[] | ReferralInvitationUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutCandidateInput | ReferralInvitationCreateOrConnectWithoutCandidateInput[]
    upsert?: ReferralInvitationUpsertWithWhereUniqueWithoutCandidateInput | ReferralInvitationUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: ReferralInvitationCreateManyCandidateInputEnvelope
    set?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    disconnect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    delete?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    update?: ReferralInvitationUpdateWithWhereUniqueWithoutCandidateInput | ReferralInvitationUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: ReferralInvitationUpdateManyWithWhereWithoutCandidateInput | ReferralInvitationUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: ReferralInvitationScalarWhereInput | ReferralInvitationScalarWhereInput[]
  }

  export type EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutUserInput
    upsert?: EmployeeProfileUpsertWithoutUserInput
    disconnect?: EmployeeProfileWhereInput | boolean
    delete?: EmployeeProfileWhereInput | boolean
    connect?: EmployeeProfileWhereUniqueInput
    update?: XOR<XOR<EmployeeProfileUpdateToOneWithWhereWithoutUserInput, EmployeeProfileUpdateWithoutUserInput>, EmployeeProfileUncheckedUpdateWithoutUserInput>
  }

  export type JobSeekerProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<JobSeekerProfileCreateWithoutUserInput, JobSeekerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: JobSeekerProfileCreateOrConnectWithoutUserInput
    upsert?: JobSeekerProfileUpsertWithoutUserInput
    disconnect?: JobSeekerProfileWhereInput | boolean
    delete?: JobSeekerProfileWhereInput | boolean
    connect?: JobSeekerProfileWhereUniqueInput
    update?: XOR<XOR<JobSeekerProfileUpdateToOneWithWhereWithoutUserInput, JobSeekerProfileUpdateWithoutUserInput>, JobSeekerProfileUncheckedUpdateWithoutUserInput>
  }

  export type ReferralApplicationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReferralApplicationCreateWithoutUserInput, ReferralApplicationUncheckedCreateWithoutUserInput> | ReferralApplicationCreateWithoutUserInput[] | ReferralApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralApplicationCreateOrConnectWithoutUserInput | ReferralApplicationCreateOrConnectWithoutUserInput[]
    upsert?: ReferralApplicationUpsertWithWhereUniqueWithoutUserInput | ReferralApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReferralApplicationCreateManyUserInputEnvelope
    set?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    disconnect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    delete?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    connect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    update?: ReferralApplicationUpdateWithWhereUniqueWithoutUserInput | ReferralApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReferralApplicationUpdateManyWithWhereWithoutUserInput | ReferralApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReferralApplicationScalarWhereInput | ReferralApplicationScalarWhereInput[]
  }

  export type JobPostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<JobPostCreateWithoutUserInput, JobPostUncheckedCreateWithoutUserInput> | JobPostCreateWithoutUserInput[] | JobPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobPostCreateOrConnectWithoutUserInput | JobPostCreateOrConnectWithoutUserInput[]
    upsert?: JobPostUpsertWithWhereUniqueWithoutUserInput | JobPostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JobPostCreateManyUserInputEnvelope
    set?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    disconnect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    delete?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    connect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    update?: JobPostUpdateWithWhereUniqueWithoutUserInput | JobPostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JobPostUpdateManyWithWhereWithoutUserInput | JobPostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JobPostScalarWhereInput | JobPostScalarWhereInput[]
  }

  export type ReferralFormUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ReferralFormCreateWithoutUserInput, ReferralFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: ReferralFormCreateOrConnectWithoutUserInput
    upsert?: ReferralFormUpsertWithoutUserInput
    disconnect?: ReferralFormWhereInput | boolean
    delete?: ReferralFormWhereInput | boolean
    connect?: ReferralFormWhereUniqueInput
    update?: XOR<XOR<ReferralFormUpdateToOneWithWhereWithoutUserInput, ReferralFormUpdateWithoutUserInput>, ReferralFormUncheckedUpdateWithoutUserInput>
  }

  export type ReferralInvitationUncheckedUpdateManyWithoutInviterNestedInput = {
    create?: XOR<ReferralInvitationCreateWithoutInviterInput, ReferralInvitationUncheckedCreateWithoutInviterInput> | ReferralInvitationCreateWithoutInviterInput[] | ReferralInvitationUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutInviterInput | ReferralInvitationCreateOrConnectWithoutInviterInput[]
    upsert?: ReferralInvitationUpsertWithWhereUniqueWithoutInviterInput | ReferralInvitationUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: ReferralInvitationCreateManyInviterInputEnvelope
    set?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    disconnect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    delete?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    update?: ReferralInvitationUpdateWithWhereUniqueWithoutInviterInput | ReferralInvitationUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: ReferralInvitationUpdateManyWithWhereWithoutInviterInput | ReferralInvitationUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: ReferralInvitationScalarWhereInput | ReferralInvitationScalarWhereInput[]
  }

  export type ReferralInvitationUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<ReferralInvitationCreateWithoutCandidateInput, ReferralInvitationUncheckedCreateWithoutCandidateInput> | ReferralInvitationCreateWithoutCandidateInput[] | ReferralInvitationUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutCandidateInput | ReferralInvitationCreateOrConnectWithoutCandidateInput[]
    upsert?: ReferralInvitationUpsertWithWhereUniqueWithoutCandidateInput | ReferralInvitationUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: ReferralInvitationCreateManyCandidateInputEnvelope
    set?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    disconnect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    delete?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    update?: ReferralInvitationUpdateWithWhereUniqueWithoutCandidateInput | ReferralInvitationUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: ReferralInvitationUpdateManyWithWhereWithoutCandidateInput | ReferralInvitationUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: ReferralInvitationScalarWhereInput | ReferralInvitationScalarWhereInput[]
  }

  export type EmployeeProfileCreateNestedManyWithoutCompanyInput = {
    create?: XOR<EmployeeProfileCreateWithoutCompanyInput, EmployeeProfileUncheckedCreateWithoutCompanyInput> | EmployeeProfileCreateWithoutCompanyInput[] | EmployeeProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutCompanyInput | EmployeeProfileCreateOrConnectWithoutCompanyInput[]
    createMany?: EmployeeProfileCreateManyCompanyInputEnvelope
    connect?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
  }

  export type JobPostCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobPostCreateWithoutCompanyInput, JobPostUncheckedCreateWithoutCompanyInput> | JobPostCreateWithoutCompanyInput[] | JobPostUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobPostCreateOrConnectWithoutCompanyInput | JobPostCreateOrConnectWithoutCompanyInput[]
    createMany?: JobPostCreateManyCompanyInputEnvelope
    connect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
  }

  export type EmployeeProfileUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<EmployeeProfileCreateWithoutCompanyInput, EmployeeProfileUncheckedCreateWithoutCompanyInput> | EmployeeProfileCreateWithoutCompanyInput[] | EmployeeProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutCompanyInput | EmployeeProfileCreateOrConnectWithoutCompanyInput[]
    createMany?: EmployeeProfileCreateManyCompanyInputEnvelope
    connect?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
  }

  export type JobPostUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobPostCreateWithoutCompanyInput, JobPostUncheckedCreateWithoutCompanyInput> | JobPostCreateWithoutCompanyInput[] | JobPostUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobPostCreateOrConnectWithoutCompanyInput | JobPostCreateOrConnectWithoutCompanyInput[]
    createMany?: JobPostCreateManyCompanyInputEnvelope
    connect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
  }

  export type EmployeeProfileUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<EmployeeProfileCreateWithoutCompanyInput, EmployeeProfileUncheckedCreateWithoutCompanyInput> | EmployeeProfileCreateWithoutCompanyInput[] | EmployeeProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutCompanyInput | EmployeeProfileCreateOrConnectWithoutCompanyInput[]
    upsert?: EmployeeProfileUpsertWithWhereUniqueWithoutCompanyInput | EmployeeProfileUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: EmployeeProfileCreateManyCompanyInputEnvelope
    set?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
    disconnect?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
    delete?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
    connect?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
    update?: EmployeeProfileUpdateWithWhereUniqueWithoutCompanyInput | EmployeeProfileUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: EmployeeProfileUpdateManyWithWhereWithoutCompanyInput | EmployeeProfileUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: EmployeeProfileScalarWhereInput | EmployeeProfileScalarWhereInput[]
  }

  export type JobPostUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobPostCreateWithoutCompanyInput, JobPostUncheckedCreateWithoutCompanyInput> | JobPostCreateWithoutCompanyInput[] | JobPostUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobPostCreateOrConnectWithoutCompanyInput | JobPostCreateOrConnectWithoutCompanyInput[]
    upsert?: JobPostUpsertWithWhereUniqueWithoutCompanyInput | JobPostUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobPostCreateManyCompanyInputEnvelope
    set?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    disconnect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    delete?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    connect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    update?: JobPostUpdateWithWhereUniqueWithoutCompanyInput | JobPostUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobPostUpdateManyWithWhereWithoutCompanyInput | JobPostUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobPostScalarWhereInput | JobPostScalarWhereInput[]
  }

  export type EmployeeProfileUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<EmployeeProfileCreateWithoutCompanyInput, EmployeeProfileUncheckedCreateWithoutCompanyInput> | EmployeeProfileCreateWithoutCompanyInput[] | EmployeeProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutCompanyInput | EmployeeProfileCreateOrConnectWithoutCompanyInput[]
    upsert?: EmployeeProfileUpsertWithWhereUniqueWithoutCompanyInput | EmployeeProfileUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: EmployeeProfileCreateManyCompanyInputEnvelope
    set?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
    disconnect?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
    delete?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
    connect?: EmployeeProfileWhereUniqueInput | EmployeeProfileWhereUniqueInput[]
    update?: EmployeeProfileUpdateWithWhereUniqueWithoutCompanyInput | EmployeeProfileUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: EmployeeProfileUpdateManyWithWhereWithoutCompanyInput | EmployeeProfileUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: EmployeeProfileScalarWhereInput | EmployeeProfileScalarWhereInput[]
  }

  export type JobPostUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobPostCreateWithoutCompanyInput, JobPostUncheckedCreateWithoutCompanyInput> | JobPostCreateWithoutCompanyInput[] | JobPostUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobPostCreateOrConnectWithoutCompanyInput | JobPostCreateOrConnectWithoutCompanyInput[]
    upsert?: JobPostUpsertWithWhereUniqueWithoutCompanyInput | JobPostUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobPostCreateManyCompanyInputEnvelope
    set?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    disconnect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    delete?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    connect?: JobPostWhereUniqueInput | JobPostWhereUniqueInput[]
    update?: JobPostUpdateWithWhereUniqueWithoutCompanyInput | JobPostUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobPostUpdateManyWithWhereWithoutCompanyInput | JobPostUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobPostScalarWhereInput | JobPostScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEmployeeProfileInput = {
    create?: XOR<UserCreateWithoutEmployeeProfileInput, UserUncheckedCreateWithoutEmployeeProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeeProfileInput
    connect?: UserWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutEmployeesInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEmployeeProfileNestedInput = {
    create?: XOR<UserCreateWithoutEmployeeProfileInput, UserUncheckedCreateWithoutEmployeeProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeeProfileInput
    upsert?: UserUpsertWithoutEmployeeProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmployeeProfileInput, UserUpdateWithoutEmployeeProfileInput>, UserUncheckedUpdateWithoutEmployeeProfileInput>
  }

  export type CompanyUpdateOneRequiredWithoutEmployeesNestedInput = {
    create?: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutEmployeesInput
    upsert?: CompanyUpsertWithoutEmployeesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutEmployeesInput, CompanyUpdateWithoutEmployeesInput>, CompanyUncheckedUpdateWithoutEmployeesInput>
  }

  export type CompanyCreateNestedOneWithoutJobPostsInput = {
    create?: XOR<CompanyCreateWithoutJobPostsInput, CompanyUncheckedCreateWithoutJobPostsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobPostsInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutJobPostsInput = {
    create?: XOR<UserCreateWithoutJobPostsInput, UserUncheckedCreateWithoutJobPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobPostsInput
    connect?: UserWhereUniqueInput
  }

  export type JobCustomFormFieldCreateNestedManyWithoutJobPostInput = {
    create?: XOR<JobCustomFormFieldCreateWithoutJobPostInput, JobCustomFormFieldUncheckedCreateWithoutJobPostInput> | JobCustomFormFieldCreateWithoutJobPostInput[] | JobCustomFormFieldUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: JobCustomFormFieldCreateOrConnectWithoutJobPostInput | JobCustomFormFieldCreateOrConnectWithoutJobPostInput[]
    createMany?: JobCustomFormFieldCreateManyJobPostInputEnvelope
    connect?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
  }

  export type ReferralApplicationCreateNestedManyWithoutJobPostInput = {
    create?: XOR<ReferralApplicationCreateWithoutJobPostInput, ReferralApplicationUncheckedCreateWithoutJobPostInput> | ReferralApplicationCreateWithoutJobPostInput[] | ReferralApplicationUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: ReferralApplicationCreateOrConnectWithoutJobPostInput | ReferralApplicationCreateOrConnectWithoutJobPostInput[]
    createMany?: ReferralApplicationCreateManyJobPostInputEnvelope
    connect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
  }

  export type ReferralInvitationCreateNestedManyWithoutJobPostInput = {
    create?: XOR<ReferralInvitationCreateWithoutJobPostInput, ReferralInvitationUncheckedCreateWithoutJobPostInput> | ReferralInvitationCreateWithoutJobPostInput[] | ReferralInvitationUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutJobPostInput | ReferralInvitationCreateOrConnectWithoutJobPostInput[]
    createMany?: ReferralInvitationCreateManyJobPostInputEnvelope
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
  }

  export type JobCustomFormFieldUncheckedCreateNestedManyWithoutJobPostInput = {
    create?: XOR<JobCustomFormFieldCreateWithoutJobPostInput, JobCustomFormFieldUncheckedCreateWithoutJobPostInput> | JobCustomFormFieldCreateWithoutJobPostInput[] | JobCustomFormFieldUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: JobCustomFormFieldCreateOrConnectWithoutJobPostInput | JobCustomFormFieldCreateOrConnectWithoutJobPostInput[]
    createMany?: JobCustomFormFieldCreateManyJobPostInputEnvelope
    connect?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
  }

  export type ReferralApplicationUncheckedCreateNestedManyWithoutJobPostInput = {
    create?: XOR<ReferralApplicationCreateWithoutJobPostInput, ReferralApplicationUncheckedCreateWithoutJobPostInput> | ReferralApplicationCreateWithoutJobPostInput[] | ReferralApplicationUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: ReferralApplicationCreateOrConnectWithoutJobPostInput | ReferralApplicationCreateOrConnectWithoutJobPostInput[]
    createMany?: ReferralApplicationCreateManyJobPostInputEnvelope
    connect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
  }

  export type ReferralInvitationUncheckedCreateNestedManyWithoutJobPostInput = {
    create?: XOR<ReferralInvitationCreateWithoutJobPostInput, ReferralInvitationUncheckedCreateWithoutJobPostInput> | ReferralInvitationCreateWithoutJobPostInput[] | ReferralInvitationUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutJobPostInput | ReferralInvitationCreateOrConnectWithoutJobPostInput[]
    createMany?: ReferralInvitationCreateManyJobPostInputEnvelope
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUpdateOneRequiredWithoutJobPostsNestedInput = {
    create?: XOR<CompanyCreateWithoutJobPostsInput, CompanyUncheckedCreateWithoutJobPostsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobPostsInput
    upsert?: CompanyUpsertWithoutJobPostsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutJobPostsInput, CompanyUpdateWithoutJobPostsInput>, CompanyUncheckedUpdateWithoutJobPostsInput>
  }

  export type UserUpdateOneRequiredWithoutJobPostsNestedInput = {
    create?: XOR<UserCreateWithoutJobPostsInput, UserUncheckedCreateWithoutJobPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobPostsInput
    upsert?: UserUpsertWithoutJobPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJobPostsInput, UserUpdateWithoutJobPostsInput>, UserUncheckedUpdateWithoutJobPostsInput>
  }

  export type JobCustomFormFieldUpdateManyWithoutJobPostNestedInput = {
    create?: XOR<JobCustomFormFieldCreateWithoutJobPostInput, JobCustomFormFieldUncheckedCreateWithoutJobPostInput> | JobCustomFormFieldCreateWithoutJobPostInput[] | JobCustomFormFieldUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: JobCustomFormFieldCreateOrConnectWithoutJobPostInput | JobCustomFormFieldCreateOrConnectWithoutJobPostInput[]
    upsert?: JobCustomFormFieldUpsertWithWhereUniqueWithoutJobPostInput | JobCustomFormFieldUpsertWithWhereUniqueWithoutJobPostInput[]
    createMany?: JobCustomFormFieldCreateManyJobPostInputEnvelope
    set?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
    disconnect?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
    delete?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
    connect?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
    update?: JobCustomFormFieldUpdateWithWhereUniqueWithoutJobPostInput | JobCustomFormFieldUpdateWithWhereUniqueWithoutJobPostInput[]
    updateMany?: JobCustomFormFieldUpdateManyWithWhereWithoutJobPostInput | JobCustomFormFieldUpdateManyWithWhereWithoutJobPostInput[]
    deleteMany?: JobCustomFormFieldScalarWhereInput | JobCustomFormFieldScalarWhereInput[]
  }

  export type ReferralApplicationUpdateManyWithoutJobPostNestedInput = {
    create?: XOR<ReferralApplicationCreateWithoutJobPostInput, ReferralApplicationUncheckedCreateWithoutJobPostInput> | ReferralApplicationCreateWithoutJobPostInput[] | ReferralApplicationUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: ReferralApplicationCreateOrConnectWithoutJobPostInput | ReferralApplicationCreateOrConnectWithoutJobPostInput[]
    upsert?: ReferralApplicationUpsertWithWhereUniqueWithoutJobPostInput | ReferralApplicationUpsertWithWhereUniqueWithoutJobPostInput[]
    createMany?: ReferralApplicationCreateManyJobPostInputEnvelope
    set?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    disconnect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    delete?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    connect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    update?: ReferralApplicationUpdateWithWhereUniqueWithoutJobPostInput | ReferralApplicationUpdateWithWhereUniqueWithoutJobPostInput[]
    updateMany?: ReferralApplicationUpdateManyWithWhereWithoutJobPostInput | ReferralApplicationUpdateManyWithWhereWithoutJobPostInput[]
    deleteMany?: ReferralApplicationScalarWhereInput | ReferralApplicationScalarWhereInput[]
  }

  export type ReferralInvitationUpdateManyWithoutJobPostNestedInput = {
    create?: XOR<ReferralInvitationCreateWithoutJobPostInput, ReferralInvitationUncheckedCreateWithoutJobPostInput> | ReferralInvitationCreateWithoutJobPostInput[] | ReferralInvitationUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutJobPostInput | ReferralInvitationCreateOrConnectWithoutJobPostInput[]
    upsert?: ReferralInvitationUpsertWithWhereUniqueWithoutJobPostInput | ReferralInvitationUpsertWithWhereUniqueWithoutJobPostInput[]
    createMany?: ReferralInvitationCreateManyJobPostInputEnvelope
    set?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    disconnect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    delete?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    update?: ReferralInvitationUpdateWithWhereUniqueWithoutJobPostInput | ReferralInvitationUpdateWithWhereUniqueWithoutJobPostInput[]
    updateMany?: ReferralInvitationUpdateManyWithWhereWithoutJobPostInput | ReferralInvitationUpdateManyWithWhereWithoutJobPostInput[]
    deleteMany?: ReferralInvitationScalarWhereInput | ReferralInvitationScalarWhereInput[]
  }

  export type JobCustomFormFieldUncheckedUpdateManyWithoutJobPostNestedInput = {
    create?: XOR<JobCustomFormFieldCreateWithoutJobPostInput, JobCustomFormFieldUncheckedCreateWithoutJobPostInput> | JobCustomFormFieldCreateWithoutJobPostInput[] | JobCustomFormFieldUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: JobCustomFormFieldCreateOrConnectWithoutJobPostInput | JobCustomFormFieldCreateOrConnectWithoutJobPostInput[]
    upsert?: JobCustomFormFieldUpsertWithWhereUniqueWithoutJobPostInput | JobCustomFormFieldUpsertWithWhereUniqueWithoutJobPostInput[]
    createMany?: JobCustomFormFieldCreateManyJobPostInputEnvelope
    set?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
    disconnect?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
    delete?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
    connect?: JobCustomFormFieldWhereUniqueInput | JobCustomFormFieldWhereUniqueInput[]
    update?: JobCustomFormFieldUpdateWithWhereUniqueWithoutJobPostInput | JobCustomFormFieldUpdateWithWhereUniqueWithoutJobPostInput[]
    updateMany?: JobCustomFormFieldUpdateManyWithWhereWithoutJobPostInput | JobCustomFormFieldUpdateManyWithWhereWithoutJobPostInput[]
    deleteMany?: JobCustomFormFieldScalarWhereInput | JobCustomFormFieldScalarWhereInput[]
  }

  export type ReferralApplicationUncheckedUpdateManyWithoutJobPostNestedInput = {
    create?: XOR<ReferralApplicationCreateWithoutJobPostInput, ReferralApplicationUncheckedCreateWithoutJobPostInput> | ReferralApplicationCreateWithoutJobPostInput[] | ReferralApplicationUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: ReferralApplicationCreateOrConnectWithoutJobPostInput | ReferralApplicationCreateOrConnectWithoutJobPostInput[]
    upsert?: ReferralApplicationUpsertWithWhereUniqueWithoutJobPostInput | ReferralApplicationUpsertWithWhereUniqueWithoutJobPostInput[]
    createMany?: ReferralApplicationCreateManyJobPostInputEnvelope
    set?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    disconnect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    delete?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    connect?: ReferralApplicationWhereUniqueInput | ReferralApplicationWhereUniqueInput[]
    update?: ReferralApplicationUpdateWithWhereUniqueWithoutJobPostInput | ReferralApplicationUpdateWithWhereUniqueWithoutJobPostInput[]
    updateMany?: ReferralApplicationUpdateManyWithWhereWithoutJobPostInput | ReferralApplicationUpdateManyWithWhereWithoutJobPostInput[]
    deleteMany?: ReferralApplicationScalarWhereInput | ReferralApplicationScalarWhereInput[]
  }

  export type ReferralInvitationUncheckedUpdateManyWithoutJobPostNestedInput = {
    create?: XOR<ReferralInvitationCreateWithoutJobPostInput, ReferralInvitationUncheckedCreateWithoutJobPostInput> | ReferralInvitationCreateWithoutJobPostInput[] | ReferralInvitationUncheckedCreateWithoutJobPostInput[]
    connectOrCreate?: ReferralInvitationCreateOrConnectWithoutJobPostInput | ReferralInvitationCreateOrConnectWithoutJobPostInput[]
    upsert?: ReferralInvitationUpsertWithWhereUniqueWithoutJobPostInput | ReferralInvitationUpsertWithWhereUniqueWithoutJobPostInput[]
    createMany?: ReferralInvitationCreateManyJobPostInputEnvelope
    set?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    disconnect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    delete?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    connect?: ReferralInvitationWhereUniqueInput | ReferralInvitationWhereUniqueInput[]
    update?: ReferralInvitationUpdateWithWhereUniqueWithoutJobPostInput | ReferralInvitationUpdateWithWhereUniqueWithoutJobPostInput[]
    updateMany?: ReferralInvitationUpdateManyWithWhereWithoutJobPostInput | ReferralInvitationUpdateManyWithWhereWithoutJobPostInput[]
    deleteMany?: ReferralInvitationScalarWhereInput | ReferralInvitationScalarWhereInput[]
  }

  export type JobPostCreateNestedOneWithoutCustomFormFieldsInput = {
    create?: XOR<JobPostCreateWithoutCustomFormFieldsInput, JobPostUncheckedCreateWithoutCustomFormFieldsInput>
    connectOrCreate?: JobPostCreateOrConnectWithoutCustomFormFieldsInput
    connect?: JobPostWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobPostUpdateOneRequiredWithoutCustomFormFieldsNestedInput = {
    create?: XOR<JobPostCreateWithoutCustomFormFieldsInput, JobPostUncheckedCreateWithoutCustomFormFieldsInput>
    connectOrCreate?: JobPostCreateOrConnectWithoutCustomFormFieldsInput
    upsert?: JobPostUpsertWithoutCustomFormFieldsInput
    connect?: JobPostWhereUniqueInput
    update?: XOR<XOR<JobPostUpdateToOneWithWhereWithoutCustomFormFieldsInput, JobPostUpdateWithoutCustomFormFieldsInput>, JobPostUncheckedUpdateWithoutCustomFormFieldsInput>
  }

  export type UserCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput
    connect?: UserWhereUniqueInput
  }

  export type JobPostCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobPostCreateWithoutApplicationsInput, JobPostUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobPostCreateOrConnectWithoutApplicationsInput
    connect?: JobPostWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput
    upsert?: UserUpsertWithoutApplicationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApplicationsInput, UserUpdateWithoutApplicationsInput>, UserUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobPostUpdateOneWithoutApplicationsNestedInput = {
    create?: XOR<JobPostCreateWithoutApplicationsInput, JobPostUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobPostCreateOrConnectWithoutApplicationsInput
    upsert?: JobPostUpsertWithoutApplicationsInput
    disconnect?: JobPostWhereInput | boolean
    delete?: JobPostWhereInput | boolean
    connect?: JobPostWhereUniqueInput
    update?: XOR<XOR<JobPostUpdateToOneWithWhereWithoutApplicationsInput, JobPostUpdateWithoutApplicationsInput>, JobPostUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserCreateNestedOneWithoutReferralFormInput = {
    create?: XOR<UserCreateWithoutReferralFormInput, UserUncheckedCreateWithoutReferralFormInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferralFormInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutReferralFormNestedInput = {
    create?: XOR<UserCreateWithoutReferralFormInput, UserUncheckedCreateWithoutReferralFormInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferralFormInput
    upsert?: UserUpsertWithoutReferralFormInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReferralFormInput, UserUpdateWithoutReferralFormInput>, UserUncheckedUpdateWithoutReferralFormInput>
  }

  export type UserCreateNestedOneWithoutJobSeekerProfileInput = {
    create?: XOR<UserCreateWithoutJobSeekerProfileInput, UserUncheckedCreateWithoutJobSeekerProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobSeekerProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutJobSeekerProfileNestedInput = {
    create?: XOR<UserCreateWithoutJobSeekerProfileInput, UserUncheckedCreateWithoutJobSeekerProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobSeekerProfileInput
    upsert?: UserUpsertWithoutJobSeekerProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJobSeekerProfileInput, UserUpdateWithoutJobSeekerProfileInput>, UserUncheckedUpdateWithoutJobSeekerProfileInput>
  }

  export type UserCreateNestedOneWithoutSentInvitationsInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedInvitationsInput = {
    create?: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type JobPostCreateNestedOneWithoutReferralInvitationsInput = {
    create?: XOR<JobPostCreateWithoutReferralInvitationsInput, JobPostUncheckedCreateWithoutReferralInvitationsInput>
    connectOrCreate?: JobPostCreateOrConnectWithoutReferralInvitationsInput
    connect?: JobPostWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSentInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    upsert?: UserUpsertWithoutSentInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentInvitationsInput, UserUpdateWithoutSentInvitationsInput>, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedInvitationsInput
    upsert?: UserUpsertWithoutReceivedInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedInvitationsInput, UserUpdateWithoutReceivedInvitationsInput>, UserUncheckedUpdateWithoutReceivedInvitationsInput>
  }

  export type JobPostUpdateOneWithoutReferralInvitationsNestedInput = {
    create?: XOR<JobPostCreateWithoutReferralInvitationsInput, JobPostUncheckedCreateWithoutReferralInvitationsInput>
    connectOrCreate?: JobPostCreateOrConnectWithoutReferralInvitationsInput
    upsert?: JobPostUpsertWithoutReferralInvitationsInput
    disconnect?: JobPostWhereInput | boolean
    delete?: JobPostWhereInput | boolean
    connect?: JobPostWhereUniqueInput
    update?: XOR<XOR<JobPostUpdateToOneWithWhereWithoutReferralInvitationsInput, JobPostUpdateWithoutReferralInvitationsInput>, JobPostUncheckedUpdateWithoutReferralInvitationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
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

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EmployeeProfileCreateWithoutUserInput = {
    id?: string
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutEmployeesInput
  }

  export type EmployeeProfileUncheckedCreateWithoutUserInput = {
    id?: string
    companyId: string
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeProfileCreateOrConnectWithoutUserInput = {
    where: EmployeeProfileWhereUniqueInput
    create: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
  }

  export type JobSeekerProfileCreateWithoutUserInput = {
    id?: string
    fullName: string
    email: string
    experience?: number | null
    primaryRole?: string | null
    skills?: string | null
    jobPreferences?: string | null
    preferredLocations?: string | null
    profileSummary?: string | null
    resumeUrl?: string | null
    profileImageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobSeekerProfileUncheckedCreateWithoutUserInput = {
    id?: string
    fullName: string
    email: string
    experience?: number | null
    primaryRole?: string | null
    skills?: string | null
    jobPreferences?: string | null
    preferredLocations?: string | null
    profileSummary?: string | null
    resumeUrl?: string | null
    profileImageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobSeekerProfileCreateOrConnectWithoutUserInput = {
    where: JobSeekerProfileWhereUniqueInput
    create: XOR<JobSeekerProfileCreateWithoutUserInput, JobSeekerProfileUncheckedCreateWithoutUserInput>
  }

  export type ReferralApplicationCreateWithoutUserInput = {
    id?: string
    employeeId: string
    status?: string
    formData?: string
    resumeUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobPost?: JobPostCreateNestedOneWithoutApplicationsInput
  }

  export type ReferralApplicationUncheckedCreateWithoutUserInput = {
    id?: string
    jobPostId?: string | null
    employeeId: string
    status?: string
    formData?: string
    resumeUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralApplicationCreateOrConnectWithoutUserInput = {
    where: ReferralApplicationWhereUniqueInput
    create: XOR<ReferralApplicationCreateWithoutUserInput, ReferralApplicationUncheckedCreateWithoutUserInput>
  }

  export type ReferralApplicationCreateManyUserInputEnvelope = {
    data: ReferralApplicationCreateManyUserInput | ReferralApplicationCreateManyUserInput[]
  }

  export type JobPostCreateWithoutUserInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobPostsInput
    customFormFields?: JobCustomFormFieldCreateNestedManyWithoutJobPostInput
    applications?: ReferralApplicationCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationCreateNestedManyWithoutJobPostInput
  }

  export type JobPostUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customFormFields?: JobCustomFormFieldUncheckedCreateNestedManyWithoutJobPostInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutJobPostInput
  }

  export type JobPostCreateOrConnectWithoutUserInput = {
    where: JobPostWhereUniqueInput
    create: XOR<JobPostCreateWithoutUserInput, JobPostUncheckedCreateWithoutUserInput>
  }

  export type JobPostCreateManyUserInputEnvelope = {
    data: JobPostCreateManyUserInput | JobPostCreateManyUserInput[]
  }

  export type ReferralFormCreateWithoutUserInput = {
    id?: string
    formTitle?: string
    fields: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralFormUncheckedCreateWithoutUserInput = {
    id?: string
    formTitle?: string
    fields: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralFormCreateOrConnectWithoutUserInput = {
    where: ReferralFormWhereUniqueInput
    create: XOR<ReferralFormCreateWithoutUserInput, ReferralFormUncheckedCreateWithoutUserInput>
  }

  export type ReferralInvitationCreateWithoutInviterInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    candidate: UserCreateNestedOneWithoutReceivedInvitationsInput
    jobPost?: JobPostCreateNestedOneWithoutReferralInvitationsInput
  }

  export type ReferralInvitationUncheckedCreateWithoutInviterInput = {
    id?: string
    candidateId: string
    jobPostId?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type ReferralInvitationCreateOrConnectWithoutInviterInput = {
    where: ReferralInvitationWhereUniqueInput
    create: XOR<ReferralInvitationCreateWithoutInviterInput, ReferralInvitationUncheckedCreateWithoutInviterInput>
  }

  export type ReferralInvitationCreateManyInviterInputEnvelope = {
    data: ReferralInvitationCreateManyInviterInput | ReferralInvitationCreateManyInviterInput[]
  }

  export type ReferralInvitationCreateWithoutCandidateInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    inviter: UserCreateNestedOneWithoutSentInvitationsInput
    jobPost?: JobPostCreateNestedOneWithoutReferralInvitationsInput
  }

  export type ReferralInvitationUncheckedCreateWithoutCandidateInput = {
    id?: string
    inviterId: string
    jobPostId?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type ReferralInvitationCreateOrConnectWithoutCandidateInput = {
    where: ReferralInvitationWhereUniqueInput
    create: XOR<ReferralInvitationCreateWithoutCandidateInput, ReferralInvitationUncheckedCreateWithoutCandidateInput>
  }

  export type ReferralInvitationCreateManyCandidateInputEnvelope = {
    data: ReferralInvitationCreateManyCandidateInput | ReferralInvitationCreateManyCandidateInput[]
  }

  export type EmployeeProfileUpsertWithoutUserInput = {
    update: XOR<EmployeeProfileUpdateWithoutUserInput, EmployeeProfileUncheckedUpdateWithoutUserInput>
    create: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    where?: EmployeeProfileWhereInput
  }

  export type EmployeeProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: EmployeeProfileWhereInput
    data: XOR<EmployeeProfileUpdateWithoutUserInput, EmployeeProfileUncheckedUpdateWithoutUserInput>
  }

  export type EmployeeProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutEmployeesNestedInput
  }

  export type EmployeeProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSeekerProfileUpsertWithoutUserInput = {
    update: XOR<JobSeekerProfileUpdateWithoutUserInput, JobSeekerProfileUncheckedUpdateWithoutUserInput>
    create: XOR<JobSeekerProfileCreateWithoutUserInput, JobSeekerProfileUncheckedCreateWithoutUserInput>
    where?: JobSeekerProfileWhereInput
  }

  export type JobSeekerProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: JobSeekerProfileWhereInput
    data: XOR<JobSeekerProfileUpdateWithoutUserInput, JobSeekerProfileUncheckedUpdateWithoutUserInput>
  }

  export type JobSeekerProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    jobPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSeekerProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    primaryRole?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    jobPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLocations?: NullableStringFieldUpdateOperationsInput | string | null
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralApplicationUpsertWithWhereUniqueWithoutUserInput = {
    where: ReferralApplicationWhereUniqueInput
    update: XOR<ReferralApplicationUpdateWithoutUserInput, ReferralApplicationUncheckedUpdateWithoutUserInput>
    create: XOR<ReferralApplicationCreateWithoutUserInput, ReferralApplicationUncheckedCreateWithoutUserInput>
  }

  export type ReferralApplicationUpdateWithWhereUniqueWithoutUserInput = {
    where: ReferralApplicationWhereUniqueInput
    data: XOR<ReferralApplicationUpdateWithoutUserInput, ReferralApplicationUncheckedUpdateWithoutUserInput>
  }

  export type ReferralApplicationUpdateManyWithWhereWithoutUserInput = {
    where: ReferralApplicationScalarWhereInput
    data: XOR<ReferralApplicationUpdateManyMutationInput, ReferralApplicationUncheckedUpdateManyWithoutUserInput>
  }

  export type ReferralApplicationScalarWhereInput = {
    AND?: ReferralApplicationScalarWhereInput | ReferralApplicationScalarWhereInput[]
    OR?: ReferralApplicationScalarWhereInput[]
    NOT?: ReferralApplicationScalarWhereInput | ReferralApplicationScalarWhereInput[]
    id?: StringFilter<"ReferralApplication"> | string
    jobPostId?: StringNullableFilter<"ReferralApplication"> | string | null
    userId?: StringFilter<"ReferralApplication"> | string
    employeeId?: StringFilter<"ReferralApplication"> | string
    status?: StringFilter<"ReferralApplication"> | string
    formData?: StringFilter<"ReferralApplication"> | string
    resumeUrl?: StringNullableFilter<"ReferralApplication"> | string | null
    deleted?: BoolFilter<"ReferralApplication"> | boolean
    createdAt?: DateTimeFilter<"ReferralApplication"> | Date | string
    updatedAt?: DateTimeFilter<"ReferralApplication"> | Date | string
  }

  export type JobPostUpsertWithWhereUniqueWithoutUserInput = {
    where: JobPostWhereUniqueInput
    update: XOR<JobPostUpdateWithoutUserInput, JobPostUncheckedUpdateWithoutUserInput>
    create: XOR<JobPostCreateWithoutUserInput, JobPostUncheckedCreateWithoutUserInput>
  }

  export type JobPostUpdateWithWhereUniqueWithoutUserInput = {
    where: JobPostWhereUniqueInput
    data: XOR<JobPostUpdateWithoutUserInput, JobPostUncheckedUpdateWithoutUserInput>
  }

  export type JobPostUpdateManyWithWhereWithoutUserInput = {
    where: JobPostScalarWhereInput
    data: XOR<JobPostUpdateManyMutationInput, JobPostUncheckedUpdateManyWithoutUserInput>
  }

  export type JobPostScalarWhereInput = {
    AND?: JobPostScalarWhereInput | JobPostScalarWhereInput[]
    OR?: JobPostScalarWhereInput[]
    NOT?: JobPostScalarWhereInput | JobPostScalarWhereInput[]
    id?: StringFilter<"JobPost"> | string
    title?: StringFilter<"JobPost"> | string
    companyName?: StringFilter<"JobPost"> | string
    description?: StringNullableFilter<"JobPost"> | string | null
    experience?: IntNullableFilter<"JobPost"> | number | null
    location?: StringNullableFilter<"JobPost"> | string | null
    skills?: StringNullableFilter<"JobPost"> | string | null
    companyId?: StringFilter<"JobPost"> | string
    userId?: StringFilter<"JobPost"> | string
    createdAt?: DateTimeFilter<"JobPost"> | Date | string
    updatedAt?: DateTimeFilter<"JobPost"> | Date | string
  }

  export type ReferralFormUpsertWithoutUserInput = {
    update: XOR<ReferralFormUpdateWithoutUserInput, ReferralFormUncheckedUpdateWithoutUserInput>
    create: XOR<ReferralFormCreateWithoutUserInput, ReferralFormUncheckedCreateWithoutUserInput>
    where?: ReferralFormWhereInput
  }

  export type ReferralFormUpdateToOneWithWhereWithoutUserInput = {
    where?: ReferralFormWhereInput
    data: XOR<ReferralFormUpdateWithoutUserInput, ReferralFormUncheckedUpdateWithoutUserInput>
  }

  export type ReferralFormUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formTitle?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralFormUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formTitle?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationUpsertWithWhereUniqueWithoutInviterInput = {
    where: ReferralInvitationWhereUniqueInput
    update: XOR<ReferralInvitationUpdateWithoutInviterInput, ReferralInvitationUncheckedUpdateWithoutInviterInput>
    create: XOR<ReferralInvitationCreateWithoutInviterInput, ReferralInvitationUncheckedCreateWithoutInviterInput>
  }

  export type ReferralInvitationUpdateWithWhereUniqueWithoutInviterInput = {
    where: ReferralInvitationWhereUniqueInput
    data: XOR<ReferralInvitationUpdateWithoutInviterInput, ReferralInvitationUncheckedUpdateWithoutInviterInput>
  }

  export type ReferralInvitationUpdateManyWithWhereWithoutInviterInput = {
    where: ReferralInvitationScalarWhereInput
    data: XOR<ReferralInvitationUpdateManyMutationInput, ReferralInvitationUncheckedUpdateManyWithoutInviterInput>
  }

  export type ReferralInvitationScalarWhereInput = {
    AND?: ReferralInvitationScalarWhereInput | ReferralInvitationScalarWhereInput[]
    OR?: ReferralInvitationScalarWhereInput[]
    NOT?: ReferralInvitationScalarWhereInput | ReferralInvitationScalarWhereInput[]
    id?: StringFilter<"ReferralInvitation"> | string
    inviterId?: StringFilter<"ReferralInvitation"> | string
    candidateId?: StringFilter<"ReferralInvitation"> | string
    jobPostId?: StringNullableFilter<"ReferralInvitation"> | string | null
    status?: StringFilter<"ReferralInvitation"> | string
    createdAt?: DateTimeFilter<"ReferralInvitation"> | Date | string
  }

  export type ReferralInvitationUpsertWithWhereUniqueWithoutCandidateInput = {
    where: ReferralInvitationWhereUniqueInput
    update: XOR<ReferralInvitationUpdateWithoutCandidateInput, ReferralInvitationUncheckedUpdateWithoutCandidateInput>
    create: XOR<ReferralInvitationCreateWithoutCandidateInput, ReferralInvitationUncheckedCreateWithoutCandidateInput>
  }

  export type ReferralInvitationUpdateWithWhereUniqueWithoutCandidateInput = {
    where: ReferralInvitationWhereUniqueInput
    data: XOR<ReferralInvitationUpdateWithoutCandidateInput, ReferralInvitationUncheckedUpdateWithoutCandidateInput>
  }

  export type ReferralInvitationUpdateManyWithWhereWithoutCandidateInput = {
    where: ReferralInvitationScalarWhereInput
    data: XOR<ReferralInvitationUpdateManyMutationInput, ReferralInvitationUncheckedUpdateManyWithoutCandidateInput>
  }

  export type EmployeeProfileCreateWithoutCompanyInput = {
    id?: string
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeProfileInput
  }

  export type EmployeeProfileUncheckedCreateWithoutCompanyInput = {
    id?: string
    userId: string
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeProfileCreateOrConnectWithoutCompanyInput = {
    where: EmployeeProfileWhereUniqueInput
    create: XOR<EmployeeProfileCreateWithoutCompanyInput, EmployeeProfileUncheckedCreateWithoutCompanyInput>
  }

  export type EmployeeProfileCreateManyCompanyInputEnvelope = {
    data: EmployeeProfileCreateManyCompanyInput | EmployeeProfileCreateManyCompanyInput[]
  }

  export type JobPostCreateWithoutCompanyInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutJobPostsInput
    customFormFields?: JobCustomFormFieldCreateNestedManyWithoutJobPostInput
    applications?: ReferralApplicationCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationCreateNestedManyWithoutJobPostInput
  }

  export type JobPostUncheckedCreateWithoutCompanyInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customFormFields?: JobCustomFormFieldUncheckedCreateNestedManyWithoutJobPostInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutJobPostInput
  }

  export type JobPostCreateOrConnectWithoutCompanyInput = {
    where: JobPostWhereUniqueInput
    create: XOR<JobPostCreateWithoutCompanyInput, JobPostUncheckedCreateWithoutCompanyInput>
  }

  export type JobPostCreateManyCompanyInputEnvelope = {
    data: JobPostCreateManyCompanyInput | JobPostCreateManyCompanyInput[]
  }

  export type EmployeeProfileUpsertWithWhereUniqueWithoutCompanyInput = {
    where: EmployeeProfileWhereUniqueInput
    update: XOR<EmployeeProfileUpdateWithoutCompanyInput, EmployeeProfileUncheckedUpdateWithoutCompanyInput>
    create: XOR<EmployeeProfileCreateWithoutCompanyInput, EmployeeProfileUncheckedCreateWithoutCompanyInput>
  }

  export type EmployeeProfileUpdateWithWhereUniqueWithoutCompanyInput = {
    where: EmployeeProfileWhereUniqueInput
    data: XOR<EmployeeProfileUpdateWithoutCompanyInput, EmployeeProfileUncheckedUpdateWithoutCompanyInput>
  }

  export type EmployeeProfileUpdateManyWithWhereWithoutCompanyInput = {
    where: EmployeeProfileScalarWhereInput
    data: XOR<EmployeeProfileUpdateManyMutationInput, EmployeeProfileUncheckedUpdateManyWithoutCompanyInput>
  }

  export type EmployeeProfileScalarWhereInput = {
    AND?: EmployeeProfileScalarWhereInput | EmployeeProfileScalarWhereInput[]
    OR?: EmployeeProfileScalarWhereInput[]
    NOT?: EmployeeProfileScalarWhereInput | EmployeeProfileScalarWhereInput[]
    id?: StringFilter<"EmployeeProfile"> | string
    userId?: StringFilter<"EmployeeProfile"> | string
    companyId?: StringFilter<"EmployeeProfile"> | string
    position?: StringNullableFilter<"EmployeeProfile"> | string | null
    createdAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
  }

  export type JobPostUpsertWithWhereUniqueWithoutCompanyInput = {
    where: JobPostWhereUniqueInput
    update: XOR<JobPostUpdateWithoutCompanyInput, JobPostUncheckedUpdateWithoutCompanyInput>
    create: XOR<JobPostCreateWithoutCompanyInput, JobPostUncheckedCreateWithoutCompanyInput>
  }

  export type JobPostUpdateWithWhereUniqueWithoutCompanyInput = {
    where: JobPostWhereUniqueInput
    data: XOR<JobPostUpdateWithoutCompanyInput, JobPostUncheckedUpdateWithoutCompanyInput>
  }

  export type JobPostUpdateManyWithWhereWithoutCompanyInput = {
    where: JobPostScalarWhereInput
    data: XOR<JobPostUpdateManyMutationInput, JobPostUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserCreateWithoutEmployeeProfileInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobSeekerProfile?: JobSeekerProfileCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationCreateNestedManyWithoutUserInput
    jobPosts?: JobPostCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateWithoutEmployeeProfileInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobSeekerProfile?: JobSeekerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutUserInput
    jobPosts?: JobPostUncheckedCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormUncheckedCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserCreateOrConnectWithoutEmployeeProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmployeeProfileInput, UserUncheckedCreateWithoutEmployeeProfileInput>
  }

  export type CompanyCreateWithoutEmployeesInput = {
    id?: string
    name: string
    description?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobPosts?: JobPostCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutEmployeesInput = {
    id?: string
    name: string
    description?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobPosts?: JobPostUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutEmployeesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
  }

  export type UserUpsertWithoutEmployeeProfileInput = {
    update: XOR<UserUpdateWithoutEmployeeProfileInput, UserUncheckedUpdateWithoutEmployeeProfileInput>
    create: XOR<UserCreateWithoutEmployeeProfileInput, UserUncheckedCreateWithoutEmployeeProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmployeeProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmployeeProfileInput, UserUncheckedUpdateWithoutEmployeeProfileInput>
  }

  export type UserUpdateWithoutEmployeeProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobSeekerProfile?: JobSeekerProfileUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateWithoutEmployeeProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobSeekerProfile?: JobSeekerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUncheckedUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUncheckedUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUncheckedUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CompanyUpsertWithoutEmployeesInput = {
    update: XOR<CompanyUpdateWithoutEmployeesInput, CompanyUncheckedUpdateWithoutEmployeesInput>
    create: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutEmployeesInput, CompanyUncheckedUpdateWithoutEmployeesInput>
  }

  export type CompanyUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobPosts?: JobPostUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobPosts?: JobPostUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutJobPostsInput = {
    id?: string
    name: string
    description?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeProfileCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutJobPostsInput = {
    id?: string
    name: string
    description?: string | null
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeProfileUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutJobPostsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutJobPostsInput, CompanyUncheckedCreateWithoutJobPostsInput>
  }

  export type UserCreateWithoutJobPostsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateWithoutJobPostsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormUncheckedCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserCreateOrConnectWithoutJobPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobPostsInput, UserUncheckedCreateWithoutJobPostsInput>
  }

  export type JobCustomFormFieldCreateWithoutJobPostInput = {
    id?: string
    label: string
    type: string
    required?: boolean
    order?: number
  }

  export type JobCustomFormFieldUncheckedCreateWithoutJobPostInput = {
    id?: string
    label: string
    type: string
    required?: boolean
    order?: number
  }

  export type JobCustomFormFieldCreateOrConnectWithoutJobPostInput = {
    where: JobCustomFormFieldWhereUniqueInput
    create: XOR<JobCustomFormFieldCreateWithoutJobPostInput, JobCustomFormFieldUncheckedCreateWithoutJobPostInput>
  }

  export type JobCustomFormFieldCreateManyJobPostInputEnvelope = {
    data: JobCustomFormFieldCreateManyJobPostInput | JobCustomFormFieldCreateManyJobPostInput[]
  }

  export type ReferralApplicationCreateWithoutJobPostInput = {
    id?: string
    employeeId: string
    status?: string
    formData?: string
    resumeUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutApplicationsInput
  }

  export type ReferralApplicationUncheckedCreateWithoutJobPostInput = {
    id?: string
    userId: string
    employeeId: string
    status?: string
    formData?: string
    resumeUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralApplicationCreateOrConnectWithoutJobPostInput = {
    where: ReferralApplicationWhereUniqueInput
    create: XOR<ReferralApplicationCreateWithoutJobPostInput, ReferralApplicationUncheckedCreateWithoutJobPostInput>
  }

  export type ReferralApplicationCreateManyJobPostInputEnvelope = {
    data: ReferralApplicationCreateManyJobPostInput | ReferralApplicationCreateManyJobPostInput[]
  }

  export type ReferralInvitationCreateWithoutJobPostInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    inviter: UserCreateNestedOneWithoutSentInvitationsInput
    candidate: UserCreateNestedOneWithoutReceivedInvitationsInput
  }

  export type ReferralInvitationUncheckedCreateWithoutJobPostInput = {
    id?: string
    inviterId: string
    candidateId: string
    status?: string
    createdAt?: Date | string
  }

  export type ReferralInvitationCreateOrConnectWithoutJobPostInput = {
    where: ReferralInvitationWhereUniqueInput
    create: XOR<ReferralInvitationCreateWithoutJobPostInput, ReferralInvitationUncheckedCreateWithoutJobPostInput>
  }

  export type ReferralInvitationCreateManyJobPostInputEnvelope = {
    data: ReferralInvitationCreateManyJobPostInput | ReferralInvitationCreateManyJobPostInput[]
  }

  export type CompanyUpsertWithoutJobPostsInput = {
    update: XOR<CompanyUpdateWithoutJobPostsInput, CompanyUncheckedUpdateWithoutJobPostsInput>
    create: XOR<CompanyCreateWithoutJobPostsInput, CompanyUncheckedCreateWithoutJobPostsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutJobPostsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutJobPostsInput, CompanyUncheckedUpdateWithoutJobPostsInput>
  }

  export type CompanyUpdateWithoutJobPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeProfileUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutJobPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeProfileUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type UserUpsertWithoutJobPostsInput = {
    update: XOR<UserUpdateWithoutJobPostsInput, UserUncheckedUpdateWithoutJobPostsInput>
    create: XOR<UserCreateWithoutJobPostsInput, UserUncheckedCreateWithoutJobPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJobPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJobPostsInput, UserUncheckedUpdateWithoutJobPostsInput>
  }

  export type UserUpdateWithoutJobPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateWithoutJobPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUncheckedUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUncheckedUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type JobCustomFormFieldUpsertWithWhereUniqueWithoutJobPostInput = {
    where: JobCustomFormFieldWhereUniqueInput
    update: XOR<JobCustomFormFieldUpdateWithoutJobPostInput, JobCustomFormFieldUncheckedUpdateWithoutJobPostInput>
    create: XOR<JobCustomFormFieldCreateWithoutJobPostInput, JobCustomFormFieldUncheckedCreateWithoutJobPostInput>
  }

  export type JobCustomFormFieldUpdateWithWhereUniqueWithoutJobPostInput = {
    where: JobCustomFormFieldWhereUniqueInput
    data: XOR<JobCustomFormFieldUpdateWithoutJobPostInput, JobCustomFormFieldUncheckedUpdateWithoutJobPostInput>
  }

  export type JobCustomFormFieldUpdateManyWithWhereWithoutJobPostInput = {
    where: JobCustomFormFieldScalarWhereInput
    data: XOR<JobCustomFormFieldUpdateManyMutationInput, JobCustomFormFieldUncheckedUpdateManyWithoutJobPostInput>
  }

  export type JobCustomFormFieldScalarWhereInput = {
    AND?: JobCustomFormFieldScalarWhereInput | JobCustomFormFieldScalarWhereInput[]
    OR?: JobCustomFormFieldScalarWhereInput[]
    NOT?: JobCustomFormFieldScalarWhereInput | JobCustomFormFieldScalarWhereInput[]
    id?: StringFilter<"JobCustomFormField"> | string
    jobPostId?: StringFilter<"JobCustomFormField"> | string
    label?: StringFilter<"JobCustomFormField"> | string
    type?: StringFilter<"JobCustomFormField"> | string
    required?: BoolFilter<"JobCustomFormField"> | boolean
    order?: IntFilter<"JobCustomFormField"> | number
  }

  export type ReferralApplicationUpsertWithWhereUniqueWithoutJobPostInput = {
    where: ReferralApplicationWhereUniqueInput
    update: XOR<ReferralApplicationUpdateWithoutJobPostInput, ReferralApplicationUncheckedUpdateWithoutJobPostInput>
    create: XOR<ReferralApplicationCreateWithoutJobPostInput, ReferralApplicationUncheckedCreateWithoutJobPostInput>
  }

  export type ReferralApplicationUpdateWithWhereUniqueWithoutJobPostInput = {
    where: ReferralApplicationWhereUniqueInput
    data: XOR<ReferralApplicationUpdateWithoutJobPostInput, ReferralApplicationUncheckedUpdateWithoutJobPostInput>
  }

  export type ReferralApplicationUpdateManyWithWhereWithoutJobPostInput = {
    where: ReferralApplicationScalarWhereInput
    data: XOR<ReferralApplicationUpdateManyMutationInput, ReferralApplicationUncheckedUpdateManyWithoutJobPostInput>
  }

  export type ReferralInvitationUpsertWithWhereUniqueWithoutJobPostInput = {
    where: ReferralInvitationWhereUniqueInput
    update: XOR<ReferralInvitationUpdateWithoutJobPostInput, ReferralInvitationUncheckedUpdateWithoutJobPostInput>
    create: XOR<ReferralInvitationCreateWithoutJobPostInput, ReferralInvitationUncheckedCreateWithoutJobPostInput>
  }

  export type ReferralInvitationUpdateWithWhereUniqueWithoutJobPostInput = {
    where: ReferralInvitationWhereUniqueInput
    data: XOR<ReferralInvitationUpdateWithoutJobPostInput, ReferralInvitationUncheckedUpdateWithoutJobPostInput>
  }

  export type ReferralInvitationUpdateManyWithWhereWithoutJobPostInput = {
    where: ReferralInvitationScalarWhereInput
    data: XOR<ReferralInvitationUpdateManyMutationInput, ReferralInvitationUncheckedUpdateManyWithoutJobPostInput>
  }

  export type JobPostCreateWithoutCustomFormFieldsInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobPostsInput
    user: UserCreateNestedOneWithoutJobPostsInput
    applications?: ReferralApplicationCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationCreateNestedManyWithoutJobPostInput
  }

  export type JobPostUncheckedCreateWithoutCustomFormFieldsInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    companyId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutJobPostInput
  }

  export type JobPostCreateOrConnectWithoutCustomFormFieldsInput = {
    where: JobPostWhereUniqueInput
    create: XOR<JobPostCreateWithoutCustomFormFieldsInput, JobPostUncheckedCreateWithoutCustomFormFieldsInput>
  }

  export type JobPostUpsertWithoutCustomFormFieldsInput = {
    update: XOR<JobPostUpdateWithoutCustomFormFieldsInput, JobPostUncheckedUpdateWithoutCustomFormFieldsInput>
    create: XOR<JobPostCreateWithoutCustomFormFieldsInput, JobPostUncheckedCreateWithoutCustomFormFieldsInput>
    where?: JobPostWhereInput
  }

  export type JobPostUpdateToOneWithWhereWithoutCustomFormFieldsInput = {
    where?: JobPostWhereInput
    data: XOR<JobPostUpdateWithoutCustomFormFieldsInput, JobPostUncheckedUpdateWithoutCustomFormFieldsInput>
  }

  export type JobPostUpdateWithoutCustomFormFieldsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobPostsNestedInput
    user?: UserUpdateOneRequiredWithoutJobPostsNestedInput
    applications?: ReferralApplicationUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUpdateManyWithoutJobPostNestedInput
  }

  export type JobPostUncheckedUpdateWithoutCustomFormFieldsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ReferralApplicationUncheckedUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUncheckedUpdateManyWithoutJobPostNestedInput
  }

  export type UserCreateWithoutApplicationsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileCreateNestedOneWithoutUserInput
    jobPosts?: JobPostCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateWithoutApplicationsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileUncheckedCreateNestedOneWithoutUserInput
    jobPosts?: JobPostUncheckedCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormUncheckedCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserCreateOrConnectWithoutApplicationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
  }

  export type JobPostCreateWithoutApplicationsInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobPostsInput
    user: UserCreateNestedOneWithoutJobPostsInput
    customFormFields?: JobCustomFormFieldCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationCreateNestedManyWithoutJobPostInput
  }

  export type JobPostUncheckedCreateWithoutApplicationsInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    companyId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customFormFields?: JobCustomFormFieldUncheckedCreateNestedManyWithoutJobPostInput
    referralInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutJobPostInput
  }

  export type JobPostCreateOrConnectWithoutApplicationsInput = {
    where: JobPostWhereUniqueInput
    create: XOR<JobPostCreateWithoutApplicationsInput, JobPostUncheckedCreateWithoutApplicationsInput>
  }

  export type UserUpsertWithoutApplicationsInput = {
    update: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUpdateOneWithoutUserNestedInput
    jobPosts?: JobPostUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUncheckedUpdateOneWithoutUserNestedInput
    jobPosts?: JobPostUncheckedUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUncheckedUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUncheckedUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type JobPostUpsertWithoutApplicationsInput = {
    update: XOR<JobPostUpdateWithoutApplicationsInput, JobPostUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobPostCreateWithoutApplicationsInput, JobPostUncheckedCreateWithoutApplicationsInput>
    where?: JobPostWhereInput
  }

  export type JobPostUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: JobPostWhereInput
    data: XOR<JobPostUpdateWithoutApplicationsInput, JobPostUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobPostUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobPostsNestedInput
    user?: UserUpdateOneRequiredWithoutJobPostsNestedInput
    customFormFields?: JobCustomFormFieldUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUpdateManyWithoutJobPostNestedInput
  }

  export type JobPostUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customFormFields?: JobCustomFormFieldUncheckedUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUncheckedUpdateManyWithoutJobPostNestedInput
  }

  export type UserCreateWithoutReferralFormInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationCreateNestedManyWithoutUserInput
    jobPosts?: JobPostCreateNestedManyWithoutUserInput
    sentInvitations?: ReferralInvitationCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateWithoutReferralFormInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutUserInput
    jobPosts?: JobPostUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserCreateOrConnectWithoutReferralFormInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReferralFormInput, UserUncheckedCreateWithoutReferralFormInput>
  }

  export type UserUpsertWithoutReferralFormInput = {
    update: XOR<UserUpdateWithoutReferralFormInput, UserUncheckedUpdateWithoutReferralFormInput>
    create: XOR<UserCreateWithoutReferralFormInput, UserUncheckedCreateWithoutReferralFormInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReferralFormInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReferralFormInput, UserUncheckedUpdateWithoutReferralFormInput>
  }

  export type UserUpdateWithoutReferralFormInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUpdateManyWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateWithoutReferralFormInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUncheckedUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type UserCreateWithoutJobSeekerProfileInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationCreateNestedManyWithoutUserInput
    jobPosts?: JobPostCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateWithoutJobSeekerProfileInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutUserInput
    jobPosts?: JobPostUncheckedCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormUncheckedCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutInviterInput
    receivedInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserCreateOrConnectWithoutJobSeekerProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobSeekerProfileInput, UserUncheckedCreateWithoutJobSeekerProfileInput>
  }

  export type UserUpsertWithoutJobSeekerProfileInput = {
    update: XOR<UserUpdateWithoutJobSeekerProfileInput, UserUncheckedUpdateWithoutJobSeekerProfileInput>
    create: XOR<UserCreateWithoutJobSeekerProfileInput, UserUncheckedCreateWithoutJobSeekerProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJobSeekerProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJobSeekerProfileInput, UserUncheckedUpdateWithoutJobSeekerProfileInput>
  }

  export type UserUpdateWithoutJobSeekerProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateWithoutJobSeekerProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUncheckedUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUncheckedUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUncheckedUpdateManyWithoutInviterNestedInput
    receivedInvitations?: ReferralInvitationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type UserCreateWithoutSentInvitationsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationCreateNestedManyWithoutUserInput
    jobPosts?: JobPostCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormCreateNestedOneWithoutUserInput
    receivedInvitations?: ReferralInvitationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateWithoutSentInvitationsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutUserInput
    jobPosts?: JobPostUncheckedCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormUncheckedCreateNestedOneWithoutUserInput
    receivedInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserCreateOrConnectWithoutSentInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
  }

  export type UserCreateWithoutReceivedInvitationsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationCreateNestedManyWithoutUserInput
    jobPosts?: JobPostCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationCreateNestedManyWithoutInviterInput
  }

  export type UserUncheckedCreateWithoutReceivedInvitationsInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    welcomeEmailSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
    jobSeekerProfile?: JobSeekerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutUserInput
    jobPosts?: JobPostUncheckedCreateNestedManyWithoutUserInput
    referralForm?: ReferralFormUncheckedCreateNestedOneWithoutUserInput
    sentInvitations?: ReferralInvitationUncheckedCreateNestedManyWithoutInviterInput
  }

  export type UserCreateOrConnectWithoutReceivedInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
  }

  export type JobPostCreateWithoutReferralInvitationsInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobPostsInput
    user: UserCreateNestedOneWithoutJobPostsInput
    customFormFields?: JobCustomFormFieldCreateNestedManyWithoutJobPostInput
    applications?: ReferralApplicationCreateNestedManyWithoutJobPostInput
  }

  export type JobPostUncheckedCreateWithoutReferralInvitationsInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    companyId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customFormFields?: JobCustomFormFieldUncheckedCreateNestedManyWithoutJobPostInput
    applications?: ReferralApplicationUncheckedCreateNestedManyWithoutJobPostInput
  }

  export type JobPostCreateOrConnectWithoutReferralInvitationsInput = {
    where: JobPostWhereUniqueInput
    create: XOR<JobPostCreateWithoutReferralInvitationsInput, JobPostUncheckedCreateWithoutReferralInvitationsInput>
  }

  export type UserUpsertWithoutSentInvitationsInput = {
    update: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type UserUpdateWithoutSentInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUpdateOneWithoutUserNestedInput
    receivedInvitations?: ReferralInvitationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateWithoutSentInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUncheckedUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUncheckedUpdateOneWithoutUserNestedInput
    receivedInvitations?: ReferralInvitationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type UserUpsertWithoutReceivedInvitationsInput = {
    update: XOR<UserUpdateWithoutReceivedInvitationsInput, UserUncheckedUpdateWithoutReceivedInvitationsInput>
    create: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedInvitationsInput, UserUncheckedUpdateWithoutReceivedInvitationsInput>
  }

  export type UserUpdateWithoutReceivedInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUpdateManyWithoutInviterNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    welcomeEmailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
    jobSeekerProfile?: JobSeekerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutUserNestedInput
    jobPosts?: JobPostUncheckedUpdateManyWithoutUserNestedInput
    referralForm?: ReferralFormUncheckedUpdateOneWithoutUserNestedInput
    sentInvitations?: ReferralInvitationUncheckedUpdateManyWithoutInviterNestedInput
  }

  export type JobPostUpsertWithoutReferralInvitationsInput = {
    update: XOR<JobPostUpdateWithoutReferralInvitationsInput, JobPostUncheckedUpdateWithoutReferralInvitationsInput>
    create: XOR<JobPostCreateWithoutReferralInvitationsInput, JobPostUncheckedCreateWithoutReferralInvitationsInput>
    where?: JobPostWhereInput
  }

  export type JobPostUpdateToOneWithWhereWithoutReferralInvitationsInput = {
    where?: JobPostWhereInput
    data: XOR<JobPostUpdateWithoutReferralInvitationsInput, JobPostUncheckedUpdateWithoutReferralInvitationsInput>
  }

  export type JobPostUpdateWithoutReferralInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobPostsNestedInput
    user?: UserUpdateOneRequiredWithoutJobPostsNestedInput
    customFormFields?: JobCustomFormFieldUpdateManyWithoutJobPostNestedInput
    applications?: ReferralApplicationUpdateManyWithoutJobPostNestedInput
  }

  export type JobPostUncheckedUpdateWithoutReferralInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customFormFields?: JobCustomFormFieldUncheckedUpdateManyWithoutJobPostNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutJobPostNestedInput
  }

  export type ReferralApplicationCreateManyUserInput = {
    id?: string
    jobPostId?: string | null
    employeeId: string
    status?: string
    formData?: string
    resumeUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobPostCreateManyUserInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralInvitationCreateManyInviterInput = {
    id?: string
    candidateId: string
    jobPostId?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type ReferralInvitationCreateManyCandidateInput = {
    id?: string
    inviterId: string
    jobPostId?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type ReferralApplicationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobPost?: JobPostUpdateOneWithoutApplicationsNestedInput
  }

  export type ReferralApplicationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralApplicationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobPostsNestedInput
    customFormFields?: JobCustomFormFieldUpdateManyWithoutJobPostNestedInput
    applications?: ReferralApplicationUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUpdateManyWithoutJobPostNestedInput
  }

  export type JobPostUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customFormFields?: JobCustomFormFieldUncheckedUpdateManyWithoutJobPostNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUncheckedUpdateManyWithoutJobPostNestedInput
  }

  export type JobPostUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput
    jobPost?: JobPostUpdateOneWithoutReferralInvitationsNestedInput
  }

  export type ReferralInvitationUncheckedUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationUncheckedUpdateManyWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviter?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
    jobPost?: JobPostUpdateOneWithoutReferralInvitationsNestedInput
  }

  export type ReferralInvitationUncheckedUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationUncheckedUpdateManyWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    jobPostId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeProfileCreateManyCompanyInput = {
    id?: string
    userId: string
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobPostCreateManyCompanyInput = {
    id?: string
    title: string
    companyName: string
    description?: string | null
    experience?: number | null
    location?: string | null
    skills?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeProfileUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeProfileNestedInput
  }

  export type EmployeeProfileUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeProfileUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutJobPostsNestedInput
    customFormFields?: JobCustomFormFieldUpdateManyWithoutJobPostNestedInput
    applications?: ReferralApplicationUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUpdateManyWithoutJobPostNestedInput
  }

  export type JobPostUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customFormFields?: JobCustomFormFieldUncheckedUpdateManyWithoutJobPostNestedInput
    applications?: ReferralApplicationUncheckedUpdateManyWithoutJobPostNestedInput
    referralInvitations?: ReferralInvitationUncheckedUpdateManyWithoutJobPostNestedInput
  }

  export type JobPostUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCustomFormFieldCreateManyJobPostInput = {
    id?: string
    label: string
    type: string
    required?: boolean
    order?: number
  }

  export type ReferralApplicationCreateManyJobPostInput = {
    id?: string
    userId: string
    employeeId: string
    status?: string
    formData?: string
    resumeUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReferralInvitationCreateManyJobPostInput = {
    id?: string
    inviterId: string
    candidateId: string
    status?: string
    createdAt?: Date | string
  }

  export type JobCustomFormFieldUpdateWithoutJobPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type JobCustomFormFieldUncheckedUpdateWithoutJobPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type JobCustomFormFieldUncheckedUpdateManyWithoutJobPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    required?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ReferralApplicationUpdateWithoutJobPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ReferralApplicationUncheckedUpdateWithoutJobPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralApplicationUncheckedUpdateManyWithoutJobPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    formData?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationUpdateWithoutJobPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviter?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
    candidate?: UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput
  }

  export type ReferralInvitationUncheckedUpdateWithoutJobPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralInvitationUncheckedUpdateManyWithoutJobPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyCountOutputTypeDefaultArgs instead
     */
    export type CompanyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobPostCountOutputTypeDefaultArgs instead
     */
    export type JobPostCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobPostCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyDefaultArgs instead
     */
    export type CompanyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployeeProfileDefaultArgs instead
     */
    export type EmployeeProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeeProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobPostDefaultArgs instead
     */
    export type JobPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobPostDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobCustomFormFieldDefaultArgs instead
     */
    export type JobCustomFormFieldArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobCustomFormFieldDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReferralApplicationDefaultArgs instead
     */
    export type ReferralApplicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReferralApplicationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReferralFormDefaultArgs instead
     */
    export type ReferralFormArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReferralFormDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobSeekerProfileDefaultArgs instead
     */
    export type JobSeekerProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobSeekerProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReferralInvitationDefaultArgs instead
     */
    export type ReferralInvitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReferralInvitationDefaultArgs<ExtArgs>

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