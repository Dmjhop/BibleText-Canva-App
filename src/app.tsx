import {
  Button,
  FormField,
  NumberInput,
  Rows,
  SegmentedControl,
  Select,
  Text,
  TextInput,
} from "@canva/app-ui-kit"
import { FormattedMessage, useIntl } from "react-intl"
import * as styles from "styles/components.css"
import { useAddElement } from "utils/use_add_element"
import { useState, useEffect, use, useRef } from "react"
import axios from "axios"
import { error } from "console"
import { CanvaError } from "@canva/error"
import { nargs } from "yargs"

export const App = () => {
  const addElement = useAddElement()
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)
  let [version, setVersion] = useState("NIV")
  let [book, setBook] = useState(1)
  let [chapter, setChapter] = useState(1)
  let [verse, setVerse] = useState(1)
  // let [empty, setEmpty] = useState("Good")

  // ! GET BIBLE VERSE CONTENT

  async function getfetchVerse() {
    console.log(
      `Version: ${version}, Book: ${book}, Chapters: ${chapter}, Verses: ${verse}`
    )

    const renVersion = version
    const renBook = book
    const renChapter = chapter
    const renVerse = verse

    console.log(
      `RENDERED Version: ${renVersion}, Book: ${renBook}, Chapters: ${renChapter}, Verses: ${renVerse}`
    )
    try {
      const response = await fetch(
        `https://bolls.life/get-verse/${renVersion}/${renBook}/${renChapter}/${renVerse}/`
      ) // API Call for the Bible Verse
      if (!response.ok) {
        throw new Error("Network response was not ok")
      } else if (response === undefined) {
        throw new Error("The verse was undefined for whatever reason")
      }
      let result = await response.json()
      console.log(result)
      let coolResult = result.text.replace("<br/>", " ")
      console.log(coolResult) //Getting rid of br random tags

      addElement({
        type: "text",
        children: [`${coolResult}`],
      })
      console.log(`${coolResult}`)
    } catch (error) {
      setError(error)
      if (error instanceof CanvaError) {
        console.log("CanvaError:", error.code)
      }
    } finally {
      setLoading(false)
    }
  }

  // ! GET BIBLE VERSE REFERENCE

  async function getVerseReference() {
    const booksOfBible = [
      { value: 1, label: "Genesis" },
      { value: 2, label: "Exodus" },
      { value: 3, label: "Leviticus" },
      { value: 4, label: "Numbers" },
      { value: 5, label: "Deuteronomy" },
      { value: 6, label: "Joshua" },
      { value: 7, label: "Judges" },
      { value: 8, label: "Ruth" },
      { value: 9, label: "1 Samuel" },
      { value: 10, label: "2 Samuel" },
      { value: 11, label: "1 Kings" },
      { value: 12, label: "2 Kings" },
      { value: 13, label: "1 Chronicles" },
      { value: 14, label: "2 Chronicles" },
      { value: 15, label: "Ezra" },
      { value: 16, label: "Nehemiah" },
      { value: 17, label: "Esther" },
      { value: 18, label: "Job" },
      { value: 19, label: "Psalms" },
      { value: 20, label: "Proverbs" },
      { value: 21, label: "Ecclesiastes" },
      { value: 22, label: "Song of Solomon" },
      { value: 23, label: "Isaiah" },
      { value: 24, label: "Jeremiah" },
      { value: 25, label: "Lamentations" },
      { value: 26, label: "Ezekiel" },
      { value: 27, label: "Daniel" },
      { value: 28, label: "Hosea" },
      { value: 29, label: "Joel" },
      { value: 30, label: "Amos" },
      { value: 31, label: "Obadiah" },
      { value: 32, label: "Jonah" },
      { value: 33, label: "Micah" },
      { value: 34, label: "Nahum" },
      { value: 35, label: "Habakkuk" },
      { value: 36, label: "Zephaniah" },
      { value: 37, label: "Haggai" },
      { value: 38, label: "Zechariah" },
      { value: 39, label: "Malachi" },
      { value: 40, label: "Matthew" },
      { value: 41, label: "Mark" },
      { value: 42, label: "Luke" },
      { value: 43, label: "John" },
      { value: 44, label: "Acts" },
      { value: 45, label: "Romans" },
      { value: 46, label: "1 Corinthians" },
      { value: 47, label: "2 Corinthians" },
      { value: 48, label: "Galatians" },
      { value: 49, label: "Ephesians" },
      { value: 50, label: "Philippians" },
      { value: 51, label: "Colossians" },
      { value: 52, label: "1 Thessalonians" },
      { value: 53, label: "2 Thessalonians" },
      { value: 54, label: "1 Timothy" },
      { value: 55, label: "2 Timothy" },
      { value: 56, label: "Titus" },
      { value: 57, label: "Philemon" },
      { value: 58, label: "Hebrews" },
      { value: 59, label: "James" },
      { value: 60, label: "1 Peter" },
      { value: 61, label: "2 Peter" },
      { value: 62, label: "1 John" },
      { value: 63, label: "2 John" },
      { value: 64, label: "3 John" },
      { value: 65, label: "Jude" },
      { value: 66, label: "Revelation" },
    ]
    let bookName
    for (let i = 0; i < booksOfBible.length; i++) {
      if (booksOfBible[i].value === book) {
        bookName = booksOfBible[i].label
      }
    }
    let verseRef = `${bookName} ${chapter}:${verse} ${version}`
    addElement({
      type: "text",
      children: [`${verseRef}`],
    })
    console.log(verseRef)
  }

  // if (version === "" || book === 0 || chapter === 0 || verse === 0) {
  //   setEmpty("Empty")
  // }

  // // !Final Verse API Call

  const intl = useIntl()

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          <FormattedMessage
            defaultMessage="
              Grab any verse using BibleText!
            "
            description="Instructions for how to make changes to the app. Do not translate <code>src/app.tsx</code>."
            values={{
              code: (chunks: any) => <code>{chunks}</code>,
            }}
          />
        </Text>
        {/* Bible Version Rendering */}
        <FormField
          label="Version"
          value={version}
          description="Being updated over time :)"
          control={(props) => (
            <SegmentedControl
              {...props}
              onChange={(value) => {
                setVersion(value)
                console.log(value)
              }}
              options={[
                { label: "NIV", value: "NIV" },
                { label: "NLT", value: "NLT" },
                { label: "ESV", value: "ESV" },
                { label: "MSG", value: "MSG" },
              ]}
            />
          )}
        />
        <FormField
          label="Book"
          description=""
          value={book}
          control={(props) => (
            <Select
              {...props}
              id="chosenBook"
              onChange={(value) => {
                setBook(value)
                console.log(value)
              }}
              options={[
                { value: 1, label: "Genesis" },
                { value: 2, label: "Exodus" },
                { value: 3, label: "Leviticus" },
                { value: 4, label: "Numbers" },
                { value: 5, label: "Deuteronomy" },
                { value: 6, label: "Joshua" },
                { value: 7, label: "Judges" },
                { value: 8, label: "Ruth" },
                { value: 9, label: "1 Samuel" },
                { value: 10, label: "2 Samuel" },
                { value: 11, label: "1 Kings" },
                { value: 12, label: "2 Kings" },
                { value: 13, label: "1 Chronicles" },
                { value: 14, label: "2 Chronicles" },
                { value: 15, label: "Ezra" },
                { value: 16, label: "Nehemiah" },
                { value: 17, label: "Esther" },
                { value: 18, label: "Job" },
                { value: 19, label: "Psalms" },
                { value: 20, label: "Proverbs" },
                { value: 21, label: "Ecclesiastes" },
                { value: 22, label: "Song of Solomon" },
                { value: 23, label: "Isaiah" },
                { value: 24, label: "Jeremiah" },
                { value: 25, label: "Lamentations" },
                { value: 26, label: "Ezekiel" },
                { value: 27, label: "Daniel" },
                { value: 28, label: "Hosea" },
                { value: 29, label: "Joel" },
                { value: 30, label: "Amos" },
                { value: 31, label: "Obadiah" },
                { value: 32, label: "Jonah" },
                { value: 33, label: "Micah" },
                { value: 34, label: "Nahum" },
                { value: 35, label: "Habakkuk" },
                { value: 36, label: "Zephaniah" },
                { value: 37, label: "Haggai" },
                { value: 38, label: "Zechariah" },
                { value: 39, label: "Malachi" },
                { value: 40, label: "Matthew" },
                { value: 41, label: "Mark" },
                { value: 42, label: "Luke" },
                { value: 43, label: "John" },
                { value: 44, label: "Acts" },
                { value: 45, label: "Romans" },
                { value: 46, label: "1 Corinthians" },
                { value: 47, label: "2 Corinthians" },
                { value: 48, label: "Galatians" },
                { value: 49, label: "Ephesians" },
                { value: 50, label: "Philippians" },
                { value: 51, label: "Colossians" },
                { value: 52, label: "1 Thessalonians" },
                { value: 53, label: "2 Thessalonians" },
                { value: 54, label: "1 Timothy" },
                { value: 55, label: "2 Timothy" },
                { value: 56, label: "Titus" },
                { value: 57, label: "Philemon" },
                { value: 58, label: "Hebrews" },
                { value: 59, label: "James" },
                { value: 60, label: "1 Peter" },
                { value: 61, label: "2 Peter" },
                { value: 62, label: "1 John" },
                { value: 63, label: "2 John" },
                { value: 64, label: "3 John" },
                { value: 65, label: "Jude" },
                { value: 66, label: "Revelation" },
              ]}
            />
          )}
        />
        <FormField
          label="Chapter"
          description=""
          value={chapter}
          control={(props) => (
            <NumberInput
              {...props}
              onChange={(value) => {
                setChapter(value)
                console.log(value)
              }}
              max={150}
              maxLength={3}
              min={1}
            />
          )}
        />
        <FormField
          label="Verse"
          description=""
          value={verse}
          control={(props) => (
            <NumberInput
              {...props}
              id="chosenVerse"
              onChange={(value) => {
                setVerse(value)
                console.log(value)
              }}
              max={176}
              maxLength={3}
              min={1}
            />
          )}
        />

        <Button
          variant="primary"
          // disabled={empty === "Empty"}
          onClick={getfetchVerse}
          stretch>
          {intl.formatMessage({
            defaultMessage: "Generate Bible Verse",
            description:
              "Button text to do something cool. Creates a new text element when pressed.",
          })}
        </Button>
        <Button
          variant="primary"
          // disabled={empty === "Empty"}
          onClick={getVerseReference}
          stretch>
          {intl.formatMessage({
            defaultMessage: "Generate Verse Reference",
            description:
              "Button text to do something cool. Creates a new text element when pressed.",
          })}
        </Button>
        <Text>
          <FormattedMessage
            defaultMessage='
              Note: Depending on the Verse you generate, it might still come with the associated title of that passage of scripture or a "<br/>". It is a bug being worked on at the moment. :)
            '
            description="Instructions for how to make changes to the app. Do not translate <code>src/app.tsx</code>."
            values={{
              code: (chunks: any) => <code>{chunks}</code>,
            }}
          />
        </Text>
      </Rows>
    </div>
  )
}
