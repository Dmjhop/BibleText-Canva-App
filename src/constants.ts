// src/constants.ts
export const BIBLE_VERSIONS = [
  {
    id: 111,
    label: "NIV",
    copyright:
      "The Holy Bible, New International Version® NIV®\nCopyright © 1973, 1978, 1984, 2011 by Biblica, Inc.®\nUsed by Permission of Biblica, Inc.® All rights reserved worldwide.",
  },
  {
    id: 110,
    label: "NIrV",
    copyright:
      "Holy Bible, New International Reader’s Version®, NIrV®\nCopyright © 1995, 1996, 1998, 2014 by Biblica, Inc.®\nUsed by permission. All rights reserved worldwide.",
  },
  {
    id: 2692,
    label: "NASB",
    copyright:
      "NEW AMERICAN STANDARD BIBLE® NASB®\nCopyright © 1960, 1971, 1977,1995, 2020 by The Lockman Foundation\nA Corporation Not for Profit\nLa Habra, CA\nAll Rights Reserved\nwww.lockman.org",
  },
] as const;

export type BibleVersionId = (typeof BIBLE_VERSIONS)[number]["id"];
