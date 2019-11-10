import pandas as pd

class LotScorer:
    def __init__(self):
        self.model = pd.read_csv("./data/3.lot_time_scores")
        self.llDist = 0.0005 # The change in lat/long corresponding to ~130m
        self.maxGridDist = 10 # look up to 10 grid squares away
        self.boundaryDelta = self.maxGridDist * self.llDist
        self.suggestionCount = 3

    # the time param is the hour from 0 - 23
    def getBestLots(self, lat, lon, time, lat0=None, lon0=None):
        max_lat = lat + self.boundaryDelta
        max_lon = lon + self.boundaryDelta
        min_lat = lat - self.boundaryDelta
        min_lon = lon - self.boundaryDelta

        m = self.model
        nearGrids = m[m.lat < max_lat][m.lat > min_lat][m.lon < max_lon][m.lon > min_lon]
        nearGrids = nearGrids[['lat','lon', str(time)]]
        nearGrids = nearGrids.nlargest(3, str(time))

        return nearGrids.values.tolist()




if __name__ == '__main__':

	s = LotScorer()
	print(s.getBestLots(-123.12, 49.260, 13))