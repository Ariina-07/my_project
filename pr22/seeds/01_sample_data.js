exports.seed = async function(knex) {
    await knex('books').del();
    await knex('authors').del();
    await knex('categories').del();

    const categories = await knex('categories').insert([
        { name: 'Фантастика' },
        { name: 'Детектив' },
        { name: 'Роман' },
        { name: 'Научная литература' }
    ]).returning('id');

    const authors = await knex('authors').insert([
        { name: 'Лев Толстой', bio: 'Русский писатель' },
        { name: 'Федор Достоевский', bio: 'Классик русской литературы' },
        { name: 'Айзек Азимов', bio: 'Американский писатель-фантаст' }
    ]).returning('id');

    await knex('books').insert([
        {
            title: 'Война и мир',
            isbn: '978-5-389-00001-1',
            publication_year: 1869,
            author_id: authors[0],
            category_id: categories[2]
        },
        {
            title: 'Преступление и наказание',
            isbn: '978-5-389-00002-2',
            publication_year: 1866,
            author_id: authors[1],
            category_id: categories[2]
        },
        {
            title: 'Я, робот',
            isbn: '978-5-389-00003-3',
            publication_year: 1950,
            author_id: authors[2],
            category_id: categories[0]
        }
    ]);
};