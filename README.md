# LoadingLink

A simple **Hotel Management System** built with **Express.js** and **PostgreSQL**. This project includes functionalities for managing hotels, rooms, and guests.

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This project is designed to manage hotels, rooms, and guests. It provides functionalities to:

- **Create and list hotels.**
- **Retrieve available rooms in a specific hotel.**
- **Fetch guest details associated with a specific hotel.**

## Features

- **Create Hotel:** Add new hotels to the system.
- **Get Hotels:** Retrieve a list of all hotels with available room counts.
- **Get Hotel Rooms:** Retrieve the number of available rooms for a specific hotel.
- **Get Guest Details:** Fetch guest details associated with a specific hotel.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** N/A (Direct SQL queries)
- **Authentication:** JWT 

## Setup and Installation

### Prerequisites

- **Node.js (>= 16.x)**
- **PostgreSQL (>= 13.x)**

### Clone the Repository

```bash
git clone https://github.com/yourusername/hotel-management-system.git
cd hotel-management-system
