import {KafkaOptions, Transport} from "@nestjs/microservices";

export const microserviceConfig: KafkaOptions = {
    transport: Transport.KAFKA,

    options: {
        client: {
            brokers: ["kafka:9092"],
            retry: {
                initialRetryTime: 500,
                retries: 8
            }
        },
        consumer: {
            groupId: 'financial-analyzer-consumer',
            allowAutoTopicCreation: true,
            retry: {
                initialRetryTime: 100,
                retries: 8
            }
        },
    }
};