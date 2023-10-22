## Getting Started

To run the real-time financial fraud detection system locally, follow these steps:

1. Clone this repository to your local machine:

    ```shell
    git clone https://github.com/joelgarciajr84/DataDollars/
    ```

2. Navigate to the repository's root directory:

    ```shell
    cd DataDollars
    ```

3. Start the system using Docker Compose:

    ```shell
    docker-compose up -d
    ```

4. To generate fake financial data for testing purposes, access the following URL in your web browser or via API requests:

    - **Fake Data Generation**: [http://localhost:3002/generate-financial-fake-data](http://localhost:3002/generate-financial-fake-data)

5. Access the Kafka UI at [http://localhost:8080](http://localhost:8080) to monitor the system and Kafka clusters.

6. Access Kibana at [http://localhost:5601](http://localhost:5601) to visualize, explore, and analyze your financial data.

