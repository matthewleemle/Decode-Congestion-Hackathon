import pandas as pd
import numpy as np


def main():
	data = pd.read_csv("./data/2_data.csv")
	wow_very_traffic = data.iloc[:, 3 : -1].max(axis=1).max()
	data.iloc[:, 3 : -1] = data.iloc[:, 3 : -1] * 100 / wow_very_traffic
	data.iloc[:, 3 : -1] = data.iloc[:, 3 : -1].replace(0, 0.5)
	data.iloc[:, 3 : -1] = data.iloc[:, 3 : -1].div(data.meter_count, axis=0)



	data.to_csv("./data/3.lot_time_scores", index = False)
	# print(data)

if __name__=='__main__':
	main()