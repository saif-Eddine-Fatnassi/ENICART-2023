#import multiprocessing

#workers = multiprocessing.cpu_count() * 2 + 1
workers = 4
worker_class = 'uvicorn.workers.UvicornWorker'
bind = '127.0.0.1:8000'
#bind = 'unix:/run/agd-api.sock'
#umask = 0o007

#logging
accesslog = '-'
errorlog = '-'
