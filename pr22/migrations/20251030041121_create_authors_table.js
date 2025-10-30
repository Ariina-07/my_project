exports.up = function(knex) {
    return knex.schema.createTable('authors', function(table) {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('bio', 500);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('authors');
};