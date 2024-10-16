import {
  Button,
  FormField,
  NumberInput,
  Rows,
  SegmentedControl,
  Select,
  Text,
} from "@canva/app-ui-kit"
import { FormattedMessage, useIntl } from "react-intl"
import * as styles from "styles/components.css"
import { useAddElement } from "utils/use_add_element"
import { useState, useEffect, use } from "react"
import axios from "axios"
import { error } from "console"
import { CanvaError } from "@canva/error"

export const App = () => {
  const addElement = useAddElement()
  let [data, setData] = useState(null)
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)
  let [formversion, setFormVersion] = useState("")
  let [version, setVersion] = useState([])
  let [book, setBook] = useState(0)
  let [chapters, setChapters] = useState(0)
  let [verses, setVerses] = useState(0)
  let [finalverse, setFinalVerse] = useState("")

  let bookAndChapterArr = []

  // ! Get the Version's Books and re run if the Version changes
  // useEffect(() => {
  //   // Define the async function to fetch data
  //   const timeoutId = setTimeout(() => {
  //     const fetchVersion = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://bolls.life/get-books/${formversion}/`
  //         ) // Replace with your API endpoint
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok")
  //         }
  //         const result = await response.json()
  //         setVersion(result)
  //       } catch (error) {
  //         setError(error)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }
  //     fetchVersion()
  //   }, 1000)

  //   return () => clearTimeout(timeoutId)
  // }, [formversion]) // Empty dependency array means this effect runs once when the component mounts

  // const bookNamesChapters = version.map((apiBook) => ({
  //   value: apiBook.name,
  //   label: apiBook.name,
  //   chaptersNum: apiBook.chapters,
  // }))

  // console.log(bookNamesChapters)
  // const [verseFormData, setVerseFormData] = useState({
  //   version: "",
  //   book: "",
  //   chapters: "",
  //   verses: "",
  // })
  // const [isFormValid, setIsFormValid] = useState(false)

  // const handleChange = (event) => {
  //   // setVersion(e.target.value)
  //   const { name, value } = event
  //   setVerseFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }))
  // }

  const handleVersionChange = (e) => {
    setFormVersion(e)
    console.log(formversion)
  }

  const handleBookChange = (e) => {
    setBook(e)
    console.log(book)
  }

  const handleChapterChange = (e) => {
    setChapters(e)
    console.log(chapters)
  }

  const handleVerseChange = (e) => {
    setVerses(e)
    console.log(verses)
  }

  // const validateForm = () => {
  //   const { version, book, chapters, verses } = verseFormData
  //   if (
  //     verseFormData.version &&
  //     verseFormData.book &&
  //     verseFormData.chapters &&
  //     verseFormData.verses
  //   ) {
  //     setIsFormValid(true)
  //   } else {
  //     setIsFormValid(false)
  //   }

  // useEffect(() => {
  //   validateForm()
  // }, [verseFormData])
  // "https://bolls.life/get-verse/NIV/43/3/16/"

  async function fetchData() {
    console.log(
      `Version: ${formversion}, Book: ${book}, Chapters: ${chapters}, Verses: ${verses}`
    )
    try {
      const response = await fetch(
        `https://bolls.life/get-verse/${formversion}/${book}/${chapters}/${verses}/`
      ) // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const result = await response.json()
      setFinalVerse(result)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  // !Final Verse API Call
  const onClick = () => {
    fetchData()

    addElement({
      type: "text",
      children: [`${finalverse.text}`],
    })
    console.log(`${finalverse.text}`)
  }

  const intl = useIntl()

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          <FormattedMessage
            defaultMessage="
              Grab a verse or 2 using the BibleText Generator!
            "
            description="Instructions for how to make changes to the app. Do not translate <code>src/app.tsx</code>."
            values={{
              code: (chunks: any) => <code>{chunks}</code>,
            }}
          />
        </Text>
        {/* Bible Version Rendering */}
        <FormField
          label="What Bible Version Do You Want?"
          description="Being updated over time :)"
          control={(props) => (
            <SegmentedControl
              {...props}
              onChange={handleVersionChange}
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
          label="What Book?"
          description=""
          control={(props) => (
            <Select
              {...props}
              onChange={handleBookChange}
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
          label="How About Chapter?"
          description=""
          control={(props) => (
            <NumberInput
              {...props}
              onChange={handleChapterChange}
              max={150}
              maxLength={3}
              min={1}
            />
          )}
        />
        <FormField
          label="Last, what Verse?"
          description=""
          control={(props) => (
            <NumberInput
              {...props}
              onChange={handleVerseChange}
              max={176}
              maxLength={3}
              min={1}
            />
          )}
        />

        <Button variant="primary" onClick={onClick} stretch>
          {intl.formatMessage({
            defaultMessage: "Generate Bible Verse",
            description:
              "Button text to do something cool. Creates a new text element when pressed.",
          })}
        </Button>
      </Rows>
    </div>
  )
}
