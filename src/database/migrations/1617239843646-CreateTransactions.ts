import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1617239843646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'transactions',
          columns: [
            { name: 'id',
              type: 'uuid',
              isPrimary: true ,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'title',
              type: 'varchar',
            },
            {
              name: 'type',
              type: 'varchar',
            },
            {
              name: 'value',
              type: 'numeric',
            },
            {
              name: 'category_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name:'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name:'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'TransactionsCategoryFK',
              columnNames: ['category_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'categories',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }
          ]
        }),
     );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('transactions');
    }

}
