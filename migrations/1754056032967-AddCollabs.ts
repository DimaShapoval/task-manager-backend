import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCollabs1754056032967 implements MigrationInterface {
    name = 'AddCollabs1754056032967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`board_collaborators_user\` (\`boardId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_33911b32997c685acbde2f5fd4\` (\`boardId\`), INDEX \`IDX_0136c0e708995225804f9c8b9f\` (\`userId\`), PRIMARY KEY (\`boardId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`board_collaborators_user\` ADD CONSTRAINT \`FK_33911b32997c685acbde2f5fd46\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`board_collaborators_user\` ADD CONSTRAINT \`FK_0136c0e708995225804f9c8b9fb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board_collaborators_user\` DROP FOREIGN KEY \`FK_0136c0e708995225804f9c8b9fb\``);
        await queryRunner.query(`ALTER TABLE \`board_collaborators_user\` DROP FOREIGN KEY \`FK_33911b32997c685acbde2f5fd46\``);
        await queryRunner.query(`DROP INDEX \`IDX_0136c0e708995225804f9c8b9f\` ON \`board_collaborators_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_33911b32997c685acbde2f5fd4\` ON \`board_collaborators_user\``);
        await queryRunner.query(`DROP TABLE \`board_collaborators_user\``);
    }

}
