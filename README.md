# Intro Note

Honestly I failed, I spent first day as analyzing the system and when it come to the coding for the whole system, I kinda over engineered and time wasn't enough. I only finish 2 services. Following is my design of whole eVoucher Management System in microservices.

![Cloud and System Design](https://i.ibb.co/ZSjZJDF/Micro-Services-Flow-Cloud-and-Technologies-drawio.png)

There are five services for whole system, API Gateway is the entry and orchestrater of the whole system, every API Docs and Authentication and Authorization process will be take place in gateway. UserSerive is a user management services, EVoucher Service is a service for creating and managing evocher product, payment methods. Promo Code is for generating qr code for purchased evochers. Aside from PromoCode, every microservices talk to each other over Nest.js Microserive TCP protocol, it wasn't the best protocol but that request/reply pattern is fast and easy to implement. For PromoCode service, there are two communication protocols, AMQP for accepting message from EVocher purchase and then schedule QR code generation to Redis Queue, and TCP Request/Reply for reporting QueueJob status for frontend. To handle concurrent connections and long running job at qr code generation, I planned to use Bull and Redis for job queue, and updating job status with ServerSentEvent or Socket.IO. I have confident that architecture can handle 1000 image creations. With the power of Kubernetes replicaSet, it can handle even more. But I want to impress to much and I overengineer the whole system and failed miserably. But, please check my finished services for my understanding of TypeScript, Node.js, Nest.js, Self Documentation Skills, and Coding skills.

