import {
  Button,
  FormField,
  Rows,
  SegmentedControl,
  Select,
  Text,
} from "@canva/app-ui-kit"
import { FormattedMessage, useIntl } from "react-intl"
import * as styles from "styles/components.css"
import { useAddElement } from "utils/use_add_element"
import { useState, useEffect } from "react"
import axios from "axios"
import { error } from "console"
import { CanvaError } from "@canva/error"

export const App = () => {
  const addElement = useAddElement()

  // const verse = await axios
  //   .get("https://bolls.life/get-verse/NKJV/43/3/16/")
  //   .then(const data = response.json)
  //   })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [version, setVersion] = useState(null)
  const [book, setBook] = useState(null)
  const [chapters, setChapters] = useState(null)
  const [verses, setVerses] = useState(null)

  let versions = "NIV"
  let books = 42
  let chapterss = 3
  let versess = 3

  // ! Get the Version's Books and re run if the Version changes
  useEffect(() => {
    // Define the async function to fetch data
    const fetchVersion = async () => {
      try {
        const response = await fetch(
          `https://bolls.life/get-books/${versions}/`
        ) // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const result = await response.json()
        setVersion(result)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchVersion()
  }, [version]) // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://bolls.life/get-verse/${versions}/${books}/${chapterss}/${versess}/`
        ) // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Empty dependency array means this effect runs once when the component mounts

  const handleVersionChange = (e) => {
    setVersion(e.target.value)
    console.log(version)
  }

  const handleBookChange = (e) => {
    setBook(e.target.value)
    console.log(book)
  }

  const handleChapterChange = (e) => {
    setChapters(e.target.value)
    console.log(chapters)
  }

  const handleVerseChange = (e) => {
    setVerses(e.target.value)
    console.log(verses)
  }

  const onClick = () => {
    addElement({
      type: "text",
      children: [`${data.text}`],
    })
    console.log(`${data.text}`)
  }

  const intl = useIntl()

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          <FormattedMessage
            defaultMessage="
              To make changes to this app, edit the <code>src/app.tsx</code> file,
              then close and reopen the app in the editor to preview the changes.
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
              onChange={}
              {...props}
              options={[
                { value: "NIV", label: "NIV" },
                { value: "NLT", label: "NLT" },
                { value: "ESV", label: "ESV" },
                { value: "MSG", label: "MSG" },
              ]}
            />
          )}
        />

        <Button variant="primary" onClick={onClick} stretch>
          {intl.formatMessage({
            defaultMessage: "Do something cool",
            description:
              "Button text to do something cool. Creates a new text element when pressed.",
          })}
        </Button>
      </Rows>
    </div>
  )
}
