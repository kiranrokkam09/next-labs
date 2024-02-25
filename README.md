# Task_NextGrowthLabs

# Django Evaluation

This repository contains my solution for the Django evaluation, which consists of three problem sets. Each problem set is described below along with additional submission details.

## Problem Set 1 - Working with Regex

### Task

Write a regular expression to extract all the numbers with an orange color background from the given JSON-like text.

### Solution

The regex to extract numbers with an orange color background is as follows:

```python
import re

data = '{"orders":[{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9},{"id":10},{"id":11},{"id":648},{"id":649},{"id":650},{"id":651},{"id":652},{"id":653}],"errors":[{"code":3,"message":"[PHP Warning #2] count(): Parameter must be an array or an object that implements Countable (153)"}]}'

matches = re.findall(r'"id":(\d+)|"code":(\d+)', data)

result = [match[0] or match[1] for match in matches if any(match)]

print(result)
```

## Problem Set 2 - Functional Web App with API

### Task

Create a web application with API endpoints for admin-facing and user-facing functionalities.

### Solution

The web app consists of two components: admin-facing and user-facing.

#### Admin-Facing

- Admin users can add Android apps and assign points to them.

#### User-Facing

- Users can view the apps added by the admin and check their earned points.
- Users can sign up, log in, and upload screenshots to verify completed tasks.

### API Documentation

#### Sign Up:

- Endpoint: POST /next/signup
- Description: Sign up a new user.
  
#### Login:

- Endpoint: POST /next/login
- Description: Login with existing user credentials.
  
#### Create App:

- Endpoint: POST /next/createapp
- Description: Create a new application.
  
#### Get Apps:

- Endpoint: GET /next/getapps
- Description: Get a list of all applications.
  
#### Assign App:

- Endpoint: POST /next/assignapp
- Description: Assign an application to a user.
  
#### Tasks:

- Endpoint: GET /next/tasks
- Description: Get a list of tasks.
  
#### Points:

- Endpoint: GET /next/points
- Description: Get user's points information.

### Repository Structure

- next-front/ # Frontend for the problem statement
- next-back/ # Backend for the problem statement
- next-back/requirements.txt # Required packages and dependencies

### Deployment

- The application Frontend has been deployed to [deployment_link](http://next-front.s3-website.ap-south-1.amazonaws.com/user.html).
- The application Backend has been deployed to [deployment_link](http://ec2-13-60-21-86.eu-north-1.compute.amazonaws.com/).
  
  ### Note:
  - Admin User Credentials for deployed app are
  - Username or email : Admin
  - Password : Admin
## Installation and Setup

To run the project locally, please follow these steps:

1. Clone the repository:
    ```
   git clone https://github.com/kiranrokkam09/next-labs.git
    ```
2. Move to the next-back directory where the backend is located:
   ```
   cd next-back
   ```
3. Create Virtual Environment:
   ```
   python -m virtualenv venv
   ```
4. Activate the Virtual Environment:
   ```
   venv/scripts/activate
   ```
5. Install the required dependencies:
    ```
   pip install -r requirements.txt
    ```
6. Create the database migrations:
     ```
     python manage.py makemigrations
     ```
7. Run the database migrations:
    ```
   python manage.py migrate
    ```
8. Create admin user fo the app:
     ```
     python manage.py createsuperuser
     ```
9. Start the development server:
    ```
   python manage.py runserver
    ```
  
## Problem Set 3 - Additional Questions

### Task

Answer the following questions:

A. Write a note about your choice of system to schedule periodic tasks and its scalability.

### Solution

For scheduling periodic tasks in a Python and Django environment, I have chosen Celery as the preferred system. Celery is a distributed task queue framework that allows for efficient and reliable task scheduling and execution.

Reasons for Choosing Celery:

1. Reliability: Celery is known for its reliability and fault-tolerance. It has built-in mechanisms to handle task failures and retries, ensuring that scheduled tasks are executed consistently and reliably.
2. Scalability: Celery is designed to handle large-scale distributed task processing. It supports distributed task queues and can easily scale horizontally by adding more worker nodes as the workload increases.
3. Task Prioritization: Celery provides the flexibility to prioritize tasks based on their importance or urgency. This feature ensures that critical tasks are executed promptly, while less time-sensitive tasks are processed accordingly.
4. Integration with Django: Celery integrates seamlessly with Django, making it an ideal choice for scheduling periodic tasks in Django applications. It leverages Django's database and ORM to store task results and track task progress.
   Possible Challenges and Solutions

By adopting Celery for scheduling periodic tasks in Python and Django, you can benefit from its reliability, scalability, and seamless integration with Django, providing a robust foundation for efficient task execution in production environments.

B. Explain the circumstances in which you would use Flask instead of Django, and vice versa.

### Solution

Flask and Django are both popular web frameworks in Python, but they have different strengths and are suitable for different circumstances. Here are some scenarios where you would choose one over the other:

Use Flask:

1. Lightweight and Flexibility: If you have a small-scale project or need a lightweight framework with minimal dependencies, Flask is a good choice. It allows for more flexibility in terms of choosing components and libraries, making it easier to customize and tailor to specific project requirements.
2. Microservices and APIs: Flask is well-suited for building microservices and APIs. Its minimalistic nature and modular design make it efficient for creating lightweight and fast API endpoints.
3. Learning and Simplicity: If you are new to web development or prefer a simpler framework, Flask's minimalistic approach and straightforward design make it easier to grasp and learn.

Use Django:

1. Rapid Development: Django is known for its "batteries included" philosophy, providing a comprehensive set of tools and features out of the box. It excels in rapid development scenarios, where you need to quickly build and deploy complex web applications with built-in functionality for authentication, database management, admin interface, and more.
2. Large-Scale Projects: When working on large-scale projects that require extensive functionality, Django's opinionated structure and conventions help maintain organization and consistency. It provides a robust ORM, authentication system, form handling, and powerful templating engine, reducing the need for manual configuration.
3. Content Management Systems (CMS): If your project involves building a CMS or requires content management capabilities, Django's admin interface provides an intuitive and powerful administration tool to manage content models and user permissions.

The decision should be based on the specific requirements of the project, the development team's familiarity with the frameworks, and the desired trade-offs between simplicity, flexibility, and built-in functionality.
