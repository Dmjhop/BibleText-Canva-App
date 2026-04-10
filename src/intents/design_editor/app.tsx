import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addElementAtCursor, addElementAtPoint } from "@canva/design";
import { requestOpenExternalUrl } from "@canva/platform";
import { FormattedMessage, useIntl } from "react-intl";
import * as styles from "styles/components.css";
import { useFeatureSupport } from "@canva/app-hooks";
import { SegmentedControl, FormField } from "@canva/app-ui-kit";
import { useState } from "react";
import { BIBLE_VERSIONS, type BibleVersionId } from "./constants";
import { usfmToReference } from "./usfm";
import { BOOK_LIST } from "./usfm";
import { fetchVerse } from "./api";

export const DOCS_URL = "https://www.canva.dev/docs/apps/";

export const App = () => {
  const isSupported = useFeatureSupport();
  const addElement = [addElementAtPoint, addElementAtCursor].find((fn) =>
    isSupported(fn),
  );
  const onClick = () => {
    if (!addElement) {
      return;
    }

    addElement({
      type: "text",
      children: ["I am changing :) and work"],
    });
  };

  const openExternalUrl = async (url: string) => {
    const response = await requestOpenExternalUrl({
      url,
    });

    if (response.status === "aborted") {
      // user decided not to navigate to the link
    }
  };

  const intl = useIntl();

  const [bibleId, setBibleId] = useState<BibleVersionId>(111);
  const [book, setBook] = useState("JHN");
  const [chapter, setChapter] = useState("3");
  const [verse, setVerse] = useState("16");
  // const version = BIBLE_VERSIONS.find((v) => v.id === bibleId);
  // const reference = usfmToReference(usfm, version.label);

  async function handleFetchVerse() {
    const usfm = `${book}.${chapter}.${verse}`;
    const data = await fetchVerse(bibleId, usfm);
  }

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
              code: (chunks) => <code>{chunks}</code>,
            }}
          />
        </Text>
        <Button
          variant="primary"
          onClick={onClick}
          disabled={!addElement}
          tooltipLabel={
            !addElement
              ? intl.formatMessage({
                  defaultMessage:
                    "This feature is not supported in the current page",
                  description:
                    "Tooltip label for when a feature is not supported in the current design",
                })
              : undefined
          }
          stretch
        >
          {intl.formatMessage({
            defaultMessage: "Do something cool",
            description:
              "Button text to do something cool. Creates a new text element when pressed.",
          })}
        </Button>
        <Button variant="secondary" onClick={() => openExternalUrl(DOCS_URL)}>
          {intl.formatMessage({
            defaultMessage: "Open Canva Apps SDK docs",
            description:
              "Button text to open Canva Apps SDK docs. Opens an external URL when pressed.",
          })}
        </Button>
        <FormField
          label="Translation"
          control={() => (
            <SegmentedControl
              value={String(bibleId)}
              options={BIBLE_VERSIONS.map((v) => ({
                label: v.label,
                value: String(v.id),
              }))}
              onChange={(value) => setBibleId(Number(value) as BibleVersionId)}
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
                setBook(value);
                console.log(value);
              }}
              options={BOOK_LIST.map((b) => ({
                value: b.code,
                label: b.name,
              }))}
            />
          )}
        />
        <FormField
          label="Chapter"
          description=""
          value={chapter}
          control={(props) => (
            <NumberInput
              min={1}
              max={150}
              value={chapter}
              onChange={(value) => setChapter(Number(value))}
            />
          )}
        />
        <FormField
          label="Verse"
          description=""
          value={verse}
          control={(props) => (
            <NumberInput
              min={1}
              max={176}
              value={verse}
              onChange={(value) => setVerse(Number(value))}
            />
          )}
        />
      </Rows>
    </div>
  );
};
