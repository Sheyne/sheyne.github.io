from collections import namedtuple
import random
import math
import attr

@attr.s
class Bot:
	aggro = attr.ib()
	initial_health = attr.ib()
	initial_strength = attr.ib()

	health = attr.ib()
	strength = attr.ib()

	@health.default
	def _(self):
		return self.initial_health
	
	@strength.default
	def _(self):
		return self.initial_strength

def sigmoid(t):
	return 1 / (1 + math.exp(-t))

bots = [Bot(random.uniform(0, 1), random.gauss(1, 0.5), random.uniform(0, 2)) for _ in range(2000)]

def new_bot():
	choice = random.choice(bots)
	return Bot(choice.aggro, choice.initial_health, choice.initial_strength)

def step_bots():
	aggr_pool = [b for b in bots if b.aggro > .9]

	if len(aggr_pool) == 0:
		return

	b1 = random.choice(aggr_pool)
	b2 = b1
	while b1 == b2:
		b2 = random.choice(bots)

	s1 = sigmoid(b1.strength * 0.5) + random.gauss(0, 0.1)
	s2 = sigmoid(b2.strength * 0.5) + random.gauss(0, 0.1)

	diff = abs(s1 - s2)
	boost = 5 / (diff + 1)

	if s1 > s2: 
		b2.health -= diff
		b1.strength += boost

	if s1 < s2: 
		b1.health -= diff
		b2.strength += boost

	if b1.health < 0:
		bots.remove(b1)
		bots.append(new_bot())

	if b2.health < 0:
		bots.remove(b2)
		bots.append(new_bot())


import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

number_of_frames = 200

def update_hist(num):
	for x in range(100):
		step_bots()
	plt.cla()
	plt.hist(np.array([b.aggro for b in bots]), range=(0, 1))

fig = plt.figure()
hist = plt.hist(np.array([b.aggro for b in bots]))

animation = animation.FuncAnimation(fig, update_hist, number_of_frames )
animation.save("state_of_nature.mp4")