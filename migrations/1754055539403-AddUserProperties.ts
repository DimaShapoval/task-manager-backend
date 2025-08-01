import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserProperties1754055539403 implements MigrationInterface {
    name = 'AddUserProperties1754055539403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user-admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`userIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`photo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isEmailConfirmed\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_ad60e7aa07e254af6520fc6f463\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_ad60e7aa07e254af6520fc6f463\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isEmailConfirmed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`photo\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`userIdId\``);
        await queryRunner.query(`DROP TABLE \`user-admin\``);
    }

}
