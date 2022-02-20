INSERT INTO strategies (strategy_name, description, custom) 
VALUES 
('Day Trading', 'Day trading, as its name implies, is the method of buying and selling securities within the same day. Positions are closed out within the same day they are taken, and no position is held overnight. Traditionally, day trading is done by professional traders, such as specialists or market makers. However, electronic trading has opened up this practice to novice traders.', false),

('Position Trading', 'Some actually consider position trading to be a buy-and-hold strategy and not active trading. However, position trading, when done by an advanced trader, can be a form of active trading. Position trading uses longer term charts – anywhere from daily to monthly – in combination with other methods to determine the trend of the current market direction. This type of trade may last for several days to several weeks and sometimes longer, depending on the trend.', false),

('Swing Trading', 'When a trend breaks, swing traders typically get in the game. At the end of a trend, there is usually some price volatility as the new trend tries to establish itself. Swing traders buy or sell as that price volatility sets in. Swing trades are usually held for more than a day but for a shorter time than trend trades. Swing traders often create a set of trading rules based on technical or fundamental analysis.', false);

INSERT INTO strategies (strategy_name, description, custom, active, upvotes, downvotes) 
VALUES 
('Volume Footprint', 'This indicator estimates a volume footprint using tick data. The script automatically separates a candle into equidistant intervals with a width obtained from the average true range or a user-given width. When applied to a chart, the user will be asked to select the settings to use for the volume footprint. Note that changing the settings afterward will reset the volume footprint, removing previously generated footprints. A new footprint will appear on the confirmation of a new bar, as such this version might only be useful in lower timeframes.', true, true, 10, 4),

('McDonald''s Pattern', 'This script fits a cubic Bezier curve using tops/bottoms in order to approximate a McDonald''s pattern, a popular meme pattern in the crypto trading community. Traditionally the McDonald''s pattern is described by an M pattern with deep retracement (> 50%), forming a McDonald''s logo. The script fits Bezier curves using specific tops/bottoms as control points. When the distance between tops and bottoms values is relatively small, the user can more easily identify the pattern. A score is shown on the top right of the chart, aiming to return how close the returned pattern is to the original logo. A regular Mcdonald''s pattern would return a red background, while an inverted pattern would return a green one.', true, true, 100, 44),

('WEndy Strat', 'Lose all money and go work at Wendy''s', true, true, 0, 99),
('Staleny Strat', 'Go to a park before invest', true, true, 6, 2),
('Give Up Strat', 'Do nothing after invested, uninstall the investment app', true, true, 1, 12),
('U Name It Strat', 'actually it hasn''t been created yet', true, true, 2, 0);