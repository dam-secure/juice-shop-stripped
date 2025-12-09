#!/bin/sh


# Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
# SPDX-License-Identifier: MIT



set -e


curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo bash -c 'echo "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker-ce.list'



apt-get update -q
apt-get upgrade -qy
apt-get install -qy apache2 docker-ce


cp /tmp/juice-shop/default.conf /etc/apache2/sites-available/000-default.conf


docker run --restart=always -d -p 3000:3000 --name juice-shop bkimminich/juice-shop


a2enmod proxy_http
systemctl restart apache2.service
