import sql from "../../../lib/,base/sql"

export default async function cost(req, res) {
    const { request } = req.query
    const { username, player_data } = req.body
    const method = req.method
    if (method === 'POST') {try {
        switch (request) {
          case 'deleteuser':
            await sql`DELETE FROM aspect_gather_users_ WHERE username = ${username};`
            res.status(200).json({ alert: 'user deleted' })
            break
          case 'users'://aka update user
            await sql`INSERT INTO aspect_gather_users_ (username, last_active, player_data) VALUES (${username}, NOW(), ${player_data}) ON DUPLICATE KEY UPDATE last_active = NOW(), player_data = ${player_data};`
            res.status(200).json({ alert: 'user added' })
            break
          default:
            res.status(400).json({
              alert: 'Invalid request',
              request: request,
              method: method,
              username: username,
              player_data: player_data
            })
        }
      } catch (error) {
        res.status(500).json({ alert: 'Server error', body: req.body, username: username, error: error })
      }
    } else {
      try {
        switch (request) {
          case 'users':
            const users = !username?await sql`SELECT * FROM aspect_gather_users_ ORDER BY last_active DESC;`:
                              await sql`SELECT * FROM aspect_gather_users_ WHERE username = ${username};`
            res.status(200).json(users)
            break
          case 'resetusers':
            await sql`DROP TABLE IF EXISTS aspect_gather_users_;`
            await sql`CREATE TABLE IF NOT EXISTS aspect_gather_users_ (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                last_active DATETIME NOT NULL,
                player_data TEXT(65535) NOT NULL
            );`
            res.status(200).json({ alert: 'users reset' })
            break
          default:
            res.status(400).json({
              alert: 'Invalid request',
              request: request,
              method: method,
              username: username,
              player_data: player_data
            })
        }
      } catch (error) {
        res.status(500).json({ alert: 'Server error', body: req.body, username: username, player_data: player_data, error: error })
      }
    }
  }
  