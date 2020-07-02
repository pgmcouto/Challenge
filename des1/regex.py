import re
import os
import sys
import json

"""
Applies RegExs to extract each column from a line on the sheet. Separates
data accordingly, and processes it.
"""
def get_info(line):
    match = re.search(r'([\w\s:.-]+)\s+([\d-]+)\s+([\S.]+)\s+([\D]+)\s+([\d]+)', line)
    data = {'Name': match.group(1).lstrip().rstrip(), 
                'Path': match.group(3).lstrip().rstrip(), 
                'Date': match.group(2).replace("-","/").lstrip().rstrip(), 
                'Size': str(round(int(match.group(5).lstrip().rstrip())/10**9,1))+' GB'
            }
    return data

"""
Extracts data from file and sets it into a list.
"""
def read_lines(file_name):

    with open(file_name, 'r') as in_file:
        content = in_file.readlines()
        in_file.close()
    return content

"""
Writes output to a json file, with appropriate formatting.
If file doesn't exist, creates it. If it does, writes the new data.
"""
def write_results(data, file_name):

    status = 'w' if(os.path.isfile(file_name)) else 'w+'                   
    with open(file_name, status) as out_file:
        json.dump(data, out_file, indent=4)
        out_file.close()

"""
Main for regex.py
"""
def main():
    
    # Defining file names and path visualization
    separator = '\\' if('win' in sys.platform) else '/'
    in_name = os.getcwd() + separator + 'planilha.txt'
    out_name = os.getcwd() + separator + 'movies.json'

    if (os.path.isfile(in_name)): # Checks if file exists in the designated path

        content = read_lines(in_name)

        if len(content) == 0: # Tests for empty file
            print('Sheet file is empty. Unable to process.')
            sys.exit(1)

        else:
            try:
                content = [get_info(x) for x in content[1:]]

            except Exception: # If sheet elements do not abide to premises, cuts execution short
                print('Sheet file contains elements with unexpected structure. Unable to proceed.')
                sys.exit(1)
            
            else:
                write_results(content, out_name)
                print(f'Output successfully created at {out_name}')
                sys.exit(0)

    else:
        print('Sheet file has not been found. Unable to continue.')
        sys.exit(1)

if __name__ == "__main__":
    main()