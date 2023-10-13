import {KafkaOptions, Transport} from "@nestjs/microservices";

export const microserviceConfig: KafkaOptions = {
    transport: Transport.KAFKA,

    options: {
        client: {
            brokers: ["kafka:9092"],
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