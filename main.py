from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import time

# Function that fetches data and updates your model
def fetch_and_update():
    print("Fetching data and updating model at:", datetime.now())
    # Your code to fetch stock data and update the model

# Initialize a scheduler
scheduler = BackgroundScheduler()
# Schedule fetch_and_update() to run every 10 minutes
scheduler.add_job(fetch_and_update, 'interval', seconds=10)

# Start the scheduler
scheduler.start()

try:
    # Keep the program running to allow scheduled tasks
    while True:
        time.sleep(1)
except (KeyboardInterrupt, SystemExit):
    # Shut down the scheduler if exiting the app
    scheduler.shutdown()
