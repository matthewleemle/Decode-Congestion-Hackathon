import pandas as pd
import numpy as np

def normalize(row):
	if ((row['WEEKDAY']-1)%7 > 2):
		row = row/4
	else:
		row = row/5
	return row


def main():
	data = pd.read_csv("./data/1_oneHots.csv").iloc[:, 1:]
	
	counts = data.drop('METER', axis=1).groupby(['lat', 'lon', 'WEEKDAY']).sum().reset_index()

	meterCount = data[['lat', 'lon', 'METER']].groupby(['lat', 'lon'])['METER'].nunique().reset_index().rename(columns={'METER': 'meter_count'})

	data = counts.join(meterCount.set_index(['lat', 'lon']), ['lat', 'lon'])
	# print(data)

	#data = (data[str(h) for h in range(24)] / 4)
	data.iloc[:, 4 : -1] = data.apply(normalize, axis=1)		
	data.to_csv('./data/2_data.csv', index = False)
	#print(data)

if __name__=='__main__':
	main()