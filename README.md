# Live-Dashboard v 1.0
This live dashbaord shows extended information about current, upcoming, postponed mamtches and it gives an overview of the pools. Dashboard is fully adjiustments what should be shown on the screen. This dashboard makes use of the Tournia API.

Dashboard is created using on client-side JavaScript.

For a full working demo see: http://www.tourniadashboard.nl/demo

v 1.0 has succefully been tested during 3 badminton tournaments

# key features
- display all information using auto adjusted tables and creating pages
- show which teams have a bye in current/planned rounds
- show expectedd time before play time in upcoming matches table
- decide how long each page is shown before moving to the next
- decide which tables need to be shown on screen

# Full feature list
- Compatible for all Tournia tournaments with live/API enabled
- Current, upcoming and postponed matches tables
- pools overview table
- decide reload time of tables (if changes detected) 
- decide which tables to show or hide
- decide which colums to show or hide
- automatic table and font adjustments according to screen size
- 2 View presets:
	- Organizers view
		- search filter added to all tables
		- long tables with all information
	- Participants view
		- adjust tables according to screen height and automatically create pages
		- automatic caroussel between pages and tables
		- decide how long each table needs to be shown
		- decide minimum page time within a table
- save setup settings using LOcalStorage

- dashboard adjusted for compatible mobile-view with all information

## Current matches table cloumns
- Court name
- Pool name
- Team 1 player names (with individual player colour coding: green = ready to play, yellow = currently playing, red = postponed)
- Team 2 player names (with individual player colour coding: green = ready to play, yellow = currently playing, red = postponed)
- already playing time
- predicted time left (BETA) (based on average match durationo statistics per pool of 4 editions of ISBT Utrecht)

## Upcoming matches table columns
- Pool name
- Team 1 player names (with individual player colour coding: green = ready to play, yellow = currently playing, red = postponed)
- Team 2 player names (with individual player colour coding: green = ready to play, yellow = currently playing, red = postponed)
- status of match/pl;ayers (free court available, ready to Play, players playing, unavailable, priority match)
- expected time bfeore play (based on average match durationo statistics per pool of 4 editions of ISBT Utrecht)

## Postponed matches table columns
- match id
- ol name
- Team 1 player (with individual player colour coding: green = ready to play, yellow = currently playing, red = postponed)
- Team 2 player names (with individual player colour coding: green = ready to play, yellow = currently playing, red = postponed))
- status of match/players (match postponed or player postponed)
- comment for postponed reason

## Pools overview table columns
- Pool name
- amount of teams
- rounds needed
- rounds created so far
- rounds left
- status of pool (new round planned, currently playing, pool finished, return round nr. x)
- teams that have a bye in planned/playing round

