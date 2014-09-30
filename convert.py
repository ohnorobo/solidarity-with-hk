#!/usr/bin/python

import json, sys
from pprint import pprint


def convert_feature(feature):

  if "contact" in feature:
    contacts = map(unicode.strip, feature["contact"].split(','))
  else:
    contacts = []

  if "page" in feature:
    page = map(unicode.strip, feature["page"].split(','))
  else:
    page = []

  print("pages and contacts")
  pprint((page, contacts))

  event = ""
  actual_contacts = []
  pages = []

  if page:
    event = filter(lambda x: "event" in x, page)
    if event:
      event = event[0]

    not_event = filter(lambda x: "event" not in x, page)

    pages = not_event

  if contacts:
    websites = filter(lambda x: "http" in x, contacts)
    actual_contacts = filter(lambda x: "http" not in x, contacts)

    pages = pages + websites

  print("final")
  pprint((event, actual_contacts, pages))

  if event != "" and event != []:
    feature["event"] = event
  if actual_contacts != [""] and actual_contacts != []:
    feature["contacts"] = actual_contacts
  if pages != [""] and pages != []:
    feature["pages"] = pages





#main

#inp = sys.stdin
#out = sys.stdout

inp = open(sys.argv[1], 'r')
out = open(sys.argv[2], 'w')

data = json.loads("".join(inp.readlines()))

features = data["features"]
for feature in features:
  convert_feature(feature["properties"])

out.write(json.dumps(data, indent=2))

