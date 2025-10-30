exports.up = function(knex) {
    return knex.schema.createTable('books', function(table) {
        table.increments('id').primary();
        table.string('title', 200).notNullable();
        table.string('isbn', 20).unique();
        table.integer('publication_year');
        table.integer('author_id').unsigned();
        table.integer('category_id').unsigned();
        table.timestamps(true, true);
        table.foreign('author_id').references('id').inTable('authors');
        table.foreign('category_id').references('id').inTable('categories');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};