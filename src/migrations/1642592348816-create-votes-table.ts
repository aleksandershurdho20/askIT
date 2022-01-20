import {MigrationInterface, QueryRunner} from "typeorm";

export class createVotesTable1642592348816 implements MigrationInterface {
    name = 'createVotesTable1642592348816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_57e75616264342b9a2637cfbfb9"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_57e75616264342b9a2637cfbfb9" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_57e75616264342b9a2637cfbfb9"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_57e75616264342b9a2637cfbfb9" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
