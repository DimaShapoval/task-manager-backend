import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserId1754055806221 implements MigrationInterface {
    name = 'RenameUserId1754055806221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_ad60e7aa07e254af6520fc6f463\``);
        await queryRunner.query(`ALTER TABLE \`board\` CHANGE \`userIdId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_c9951f13af7909d37c0e2aec484\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_c9951f13af7909d37c0e2aec484\``);
        await queryRunner.query(`ALTER TABLE \`board\` CHANGE \`userId\` \`userIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_ad60e7aa07e254af6520fc6f463\` FOREIGN KEY (\`userIdId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
