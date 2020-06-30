import re
import json

def get_info(line):
    match = re.search(r'([\w\s:.-]+)\s+([\d-]+)\s+([\S.]+)\s+([\D]+)\s+([\d]+)', line)
    data = {'Name': match.group(1).lstrip().rstrip(), 
                'Path': match.group(3).lstrip().rstrip(), 
                'Date': match.group(2).replace("-","/").lstrip().rstrip(), 
                'Size': str(round(int(match.group(5).lstrip().rstrip())/10**9,1))+' GB'
            }
    return data
            
with open('planilha.txt', 'r') as f:

    content = f.readlines()
    content = [get_info(x) for x in content]

with open('movies.json', 'w+') as file:
    json.dump(data, file, indent=4)