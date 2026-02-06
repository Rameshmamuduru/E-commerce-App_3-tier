# E-commerce-App

**Launch 3 ec2 istances**

## configure DB:
```
sudo apt update
sudo install mysql-server -y
sudo systemctl start mysql

sudo mysql
CREATE DATABASE shopdb;
CREATE USER 'root'@'%' INDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON shopdb .* TO 'root';
FLUSH PRIVILEGED;
exit;

cd /opt
git clone <repo>
cd E-commerce-App/database
mysql -u root -p shopdb < schema.sql
and enter your password
```


## Backend configaration:

```
sudo apt update
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
sudo npm install -g pm2
pm2 -v
cd /opt
git clone <repo>
cd E-commerce-App/backend
pm2 start app.js --name backend
pm2 status  #should be online
pme startup
pm2 save
```
you can verify backend and db status bu running the below commands

```
pm2 logs backend
```
<img width="1166" height="290" alt="image" src="https://github.com/user-attachments/assets/13f408ae-4981-4963-826b-dbcee1cf2b9a" />


And make the changes in db.js in the backend configaration 

## Frontend Configaration:

```
sudo apt update
sudo apt install nginx -y
cd /opt
git clone <repo>
cd E-commerce-App/frontend
cp * /var/www/html

and now prepare the nginx configaration file

cd /etc/nginx/sites-available/
sudo vim shopapp

server {
    listen 80;
    server_name 13.233.129.57;  # Replace with your domain or IP


    root /usr/share/nginx/html;
    index index.html;

    client_max_body_size 50M;

    location /products {
        proxy_pass http://3.110.212.96:3000/;  # Node.js backend
        proxy_http_version 1.1;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        # Forward headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;
    }
}

make sure you change your server name and proxy path and then check the validation using below commands

nginx -t

you shouls see success.

sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

Now you can access you app by hitting <public_ip:80> in browser.

<img width="1364" height="535" alt="image" src="https://github.com/user-attachments/assets/9870d6ae-365b-4143-a533-e0ddda99283a" />


Note: All the 3 product images are coming from DB only so if DB down you wont get data.

## Ports to allow (check if you are using different db's)
```
| Service         | Default Port | Notes                                     |
| --------------- | ------------ | ----------------------------------------- |
| Node.js backend | 3000         | Your app port, can be any you set in code |
| MySQL           | 3306         | DB connection port                        |
| PostgreSQL      | 5432         | If using Postgres instead of MySQL        |
| MongoDB         | 27017        | If using MongoDB                          |
| PM2 Monitoring  | 9615         | Optional, PM2 dashboard                   |
```


