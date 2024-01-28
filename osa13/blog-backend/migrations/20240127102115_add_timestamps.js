
exports.up = function(knex) {
    return Promise.all([
      knex.schema.table('users', function (table) {
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      }),
      knex.schema.table('blogs', function (table) {
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.table('users', function (table) {
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
      }),
      knex.schema.table('blogs', function (table) {
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
      })
    ]);
  };