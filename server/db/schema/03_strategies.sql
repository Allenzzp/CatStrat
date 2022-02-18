DROP TABLE IF EXISTS strategies CASCADE;

CREATE TABLE strategies (
  id SERIAL PRIMARY KEY NOT NULL,
  strategy_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  custom BOOLEAN NOT NULL DEFAULT TRUE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



update strategies set upvotes = (select upvotes from strategies where id = 1)+ 1 