To launch the application run following commands:

<ol>
  <li><strong>docker-compose up -d</strong> For run database</li>
  <li><strong>yarn</strong> For install dependencies</li>
  <li><strong>yarn build</strong> For build app</li>
  <li><strong>yarn start:prod</strong> For run app in production environment</li>
</ol>

After that, open the URL <strong>localhost:7200/graphql</strong> in your browser.

Database indexes will be created automatically (dbConnection.ts 31 line)





