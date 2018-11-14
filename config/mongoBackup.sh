#!/bin/bash
sudo mongodump --out /var/backups/mongobackups/`date +"%d-%m-%y"`
