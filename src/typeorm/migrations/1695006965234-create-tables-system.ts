import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablesSystem1695006965234 implements MigrationInterface {
    name = 'createTablesSystem1695006965234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SYS_Application" ("ApplicationId" uniqueidentifier NOT NULL CONSTRAINT "DF_966f8331c068b7171eaf887ba22" DEFAULT NEWSEQUENTIALID(), "ApplicationName" nvarchar(255) NOT NULL, "IsEnabled" bit CONSTRAINT "DF_8bbc003dc2d91912c61a5e50235" DEFAULT '0', "ApplicationGroupId" uniqueidentifier, "EnvironmentId" varchar(255) NOT NULL, "Config" nvarchar(MAX), CONSTRAINT "PK_966f8331c068b7171eaf887ba22" PRIMARY KEY ("ApplicationId"))`);
        await queryRunner.query(`CREATE TABLE "SYS_ApplicationGroup" ("ApplicationGroupId" uniqueidentifier NOT NULL CONSTRAINT "DF_e8e5b895d865c3cb1f778ac360f" DEFAULT NEWSEQUENTIALID(), "ApplicationGroupName" nvarchar(255) NOT NULL, "ParentId" uniqueidentifier, CONSTRAINT "PK_e8e5b895d865c3cb1f778ac360f" PRIMARY KEY ("ApplicationGroupId"))`);
        await queryRunner.query(`CREATE TABLE "SYS_LoggerActionType" ("ID" nvarchar(255) NOT NULL, "Name" nvarchar(255) NOT NULL, CONSTRAINT "PK_322831da16cb03f521180cff774" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "SYS_UserStatus" ("UserStatusId" varchar(255) NOT NULL, "UserStatusName" nvarchar(255) NOT NULL, CONSTRAINT "PK_3d17d97921508f9d9d5dcd8a283" PRIMARY KEY ("UserStatusId"))`);
        await queryRunner.query(`CREATE TABLE "SYS_Role_Application" ("ID" uniqueidentifier NOT NULL CONSTRAINT "DF_63a9fe77d5964063825fb184a2c" DEFAULT NEWSEQUENTIALID(), "RoleId" uniqueidentifier NOT NULL, "ApplicationId" uniqueidentifier NOT NULL, "Stt" int NOT NULL CONSTRAINT "DF_d6d2ecdea48cc220db2076d9a06" DEFAULT '0', CONSTRAINT "PK_63a9fe77d5964063825fb184a2c" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "SYS_Role" ("RoleId" uniqueidentifier NOT NULL CONSTRAINT "DF_b914875d08aa15f7f9f3a899cb8" DEFAULT NEWSEQUENTIALID(), "RoleName" nvarchar(255) NOT NULL, "RoleParentId" uniqueidentifier, "Status" nvarchar(255) NOT NULL, CONSTRAINT "PK_b914875d08aa15f7f9f3a899cb8" PRIMARY KEY ("RoleId"))`);
        await queryRunner.query(`CREATE TABLE "SYS_User" ("UserId" uniqueidentifier NOT NULL CONSTRAINT "DF_17d8cbc00a841f22a44bf5de2e5" DEFAULT NEWSEQUENTIALID(), "Username" nvarchar(100) NOT NULL, "Password" nvarchar(255) NOT NULL, "DisplayName" nvarchar(255), "StatusId" varchar(255) CONSTRAINT "DF_712f7fd07a0ba49f2c30a333205" DEFAULT 'REQUEST', "LockDate" datetime, "CreateDate" datetime NOT NULL CONSTRAINT "DF_1c938ae84448071e3c173e8b779" DEFAULT getdate(), "UpdateDate" datetime NOT NULL CONSTRAINT "DF_b60de6e63336d504f77e3230c8f" DEFAULT getdate(), "Avatar" nvarchar(255), "RoleId" uniqueidentifier NOT NULL, "OTP" nvarchar(255), CONSTRAINT "UQ_9123f4d77180893b438643c1421" UNIQUE ("Username"), CONSTRAINT "PK_17d8cbc00a841f22a44bf5de2e5" PRIMARY KEY ("UserId"))`);
        await queryRunner.query(`CREATE TABLE "SYS_Logger" ("ID" uniqueidentifier NOT NULL CONSTRAINT "DF_57613dd4ea1ef9b236ba13faaf9" DEFAULT NEWSEQUENTIALID(), "UserId" uniqueidentifier NOT NULL, "CreateDate" datetime NOT NULL CONSTRAINT "DF_b20bddcf9f9422ecabe1b904ea6" DEFAULT getdate(), "ApplicationId" uniqueidentifier, "ActionTypeId" nvarchar(255) NOT NULL, "Description" nvarchar(MAX) NOT NULL, "Note" nvarchar(MAX) NOT NULL, CONSTRAINT "PK_57613dd4ea1ef9b236ba13faaf9" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "SYS_UserEmail" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_2cfbf332df414e311e19b83382e" DEFAULT NEWSEQUENTIALID(), "UserId" uniqueidentifier NOT NULL, "Email" nvarchar(255) NOT NULL, "DateRequest" datetime NOT NULL CONSTRAINT "DF_dea03de6c22d91abcc10256c5b4" DEFAULT getdate(), "Count" int CONSTRAINT "DF_e33cc80fb7c4c1f052524e76038" DEFAULT 0, CONSTRAINT "PK_2cfbf332df414e311e19b83382e" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_657ecd445996f2ec8b1a4689d8" ON "SYS_UserEmail" ("UserId") WHERE "UserId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SYS_Application" ADD CONSTRAINT "FK_ecb9ca12cb8c930adf56309819d" FOREIGN KEY ("ApplicationGroupId") REFERENCES "SYS_ApplicationGroup"("ApplicationGroupId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SYS_Role_Application" ADD CONSTRAINT "FK_0585d768b1019f1af24b2352eef" FOREIGN KEY ("RoleId") REFERENCES "SYS_Role"("RoleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SYS_Role_Application" ADD CONSTRAINT "FK_aba24908cc3a2a8f9acec60533f" FOREIGN KEY ("ApplicationId") REFERENCES "SYS_Application"("ApplicationId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SYS_Role" ADD CONSTRAINT "FK_e12a9946c5e3d29aa8aae86e489" FOREIGN KEY ("RoleParentId") REFERENCES "SYS_Role"("RoleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SYS_User" ADD CONSTRAINT "FK_712f7fd07a0ba49f2c30a333205" FOREIGN KEY ("StatusId") REFERENCES "SYS_UserStatus"("UserStatusId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SYS_User" ADD CONSTRAINT "FK_735d0e6a200bac6813a6fa28618" FOREIGN KEY ("RoleId") REFERENCES "SYS_Role"("RoleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SYS_Logger" ADD CONSTRAINT "FK_821c46820d0eb8dffe6bd57c8e0" FOREIGN KEY ("UserId") REFERENCES "SYS_User"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SYS_Logger" ADD CONSTRAINT "FK_b9f08678092ee1e02bd240c8051" FOREIGN KEY ("ApplicationId") REFERENCES "SYS_Application"("ApplicationId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SYS_Logger" ADD CONSTRAINT "FK_ecdbc4644e7d3782cadf0c2d936" FOREIGN KEY ("ActionTypeId") REFERENCES "SYS_LoggerActionType"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SYS_UserEmail" ADD CONSTRAINT "FK_657ecd445996f2ec8b1a4689d85" FOREIGN KEY ("UserId") REFERENCES "SYS_User"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    
        await queryRunner.query(`INSERT INTO SYS_UserStatus (UserStatusId,UserStatusName) VALUES (N'EXPIRED',N'EXPIRED'), (N'LOCKED',N'LOCKED'), (N'OPEN',N'OPEN'), (N'REQUEST',N'REQUEST')`);
        await queryRunner.query(`INSERT INTO SYS_LoggerActionType (ID,Name) VALUES (N'ACCESS',N'Truy cập'), (N'INSERT',N'Thêm mới'), (N'LOGIN',N'Đăng nhập'), (N'LOUT',N'Đăng xuất'), (N'REMOVE',N'Xóa'), (N'UPDATE',N'Cập nhật')`);
        await queryRunner.query(`INSERT INTO SYS_Application (ApplicationId,ApplicationName,IsEnabled,ApplicationGroupId,EnvironmentId,Config) VALUES (N'AAC47065-0F73-EA11-80CF-97CC0449692F',N'Quản trị hệ thống',1,NULL,N'W',N'{}'), (N'D84927C4-E682-EA11-80CF-97CC0449692F',N'Global config',1,NULL,N'W',N'{}')`);
        await queryRunner.query(`INSERT INTO SYS_Role (RoleId,RoleName,RoleParentId,Status) VALUES ('FEFF3867-0F14-ED11-818A-95858A6D3493',N'Admin',NULL,N'OPEN')`);
        await queryRunner.query(`INSERT INTO SYS_Role_Application (ID,RoleId,ApplicationId,Stt) VALUES (N'D233753D-9DFB-ED11-AD12-0CC47A771BD1',N'FEFF3867-0F14-ED11-818A-95858A6D3493',N'AAC47065-0F73-EA11-80CF-97CC0449692F',0)`);
        await queryRunner.query(`INSERT INTO SYS_User (UserId,Username,Password,DisplayName,StatusId,LockDate,CreateDate,UpdateDate,Avatar,RoleId,OTP) VALUES ('02E75596-1516-ED11-818A-95858A6D3493',N'admin',N'$2b$12$sCTsAjbIbMNK37VHZ7XTnuB3K/ahFV4p5Ru85kRy8SecTxwFGg2dm',N'Admin','OPEN',NULL,GETDATE(),GETDATE(), N'https://drive.google.com/uc?id=1j2P_E_qfjUmu_LF3x9K5KLPBJNBgwliB','FEFF3867-0F14-ED11-818A-95858A6D3493',NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SYS_UserEmail" DROP CONSTRAINT "FK_657ecd445996f2ec8b1a4689d85"`);
        await queryRunner.query(`ALTER TABLE "SYS_Logger" DROP CONSTRAINT "FK_ecdbc4644e7d3782cadf0c2d936"`);
        await queryRunner.query(`ALTER TABLE "SYS_Logger" DROP CONSTRAINT "FK_b9f08678092ee1e02bd240c8051"`);
        await queryRunner.query(`ALTER TABLE "SYS_Logger" DROP CONSTRAINT "FK_821c46820d0eb8dffe6bd57c8e0"`);
        await queryRunner.query(`ALTER TABLE "SYS_User" DROP CONSTRAINT "FK_735d0e6a200bac6813a6fa28618"`);
        await queryRunner.query(`ALTER TABLE "SYS_User" DROP CONSTRAINT "FK_712f7fd07a0ba49f2c30a333205"`);
        await queryRunner.query(`ALTER TABLE "SYS_Role" DROP CONSTRAINT "FK_e12a9946c5e3d29aa8aae86e489"`);
        await queryRunner.query(`ALTER TABLE "SYS_Role_Application" DROP CONSTRAINT "FK_aba24908cc3a2a8f9acec60533f"`);
        await queryRunner.query(`ALTER TABLE "SYS_Role_Application" DROP CONSTRAINT "FK_0585d768b1019f1af24b2352eef"`);
        await queryRunner.query(`ALTER TABLE "SYS_Application" DROP CONSTRAINT "FK_ecb9ca12cb8c930adf56309819d"`);
        await queryRunner.query(`DROP INDEX "REL_657ecd445996f2ec8b1a4689d8" ON "SYS_UserEmail"`);
        await queryRunner.query(`DROP TABLE "SYS_UserEmail"`);
        await queryRunner.query(`DROP TABLE "SYS_Logger"`);
        await queryRunner.query(`DROP TABLE "SYS_User"`);
        await queryRunner.query(`DROP TABLE "SYS_Role"`);
        await queryRunner.query(`DROP TABLE "SYS_Role_Application"`);
        await queryRunner.query(`DROP TABLE "SYS_UserStatus"`);
        await queryRunner.query(`DROP TABLE "SYS_LoggerActionType"`);
        await queryRunner.query(`DROP TABLE "SYS_ApplicationGroup"`);
        await queryRunner.query(`DROP TABLE "SYS_Application"`);
    }

}
