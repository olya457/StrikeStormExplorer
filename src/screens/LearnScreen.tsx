import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {AppBackground} from '../components/AppBackground';
import {HeaderBar} from '../components/HeaderBar';
import {PrimaryButton} from '../components/PrimaryButton';
import {SegmentedControl} from '../components/SegmentedControl';
import {blogPosts, factSections, quizQuestions} from '../data/content';
import {colors, radii} from '../styles/theme';
import {useScreenInsets} from '../styles/useScreenInsets';
import type {BlogCategory} from '../types/content';

const learnTabs = ['Facts', 'Quiz', 'Travel', 'History', 'Engineering', 'Science'] as const;
type LearnTab = (typeof learnTabs)[number];

export function LearnScreen() {
  const insets = useScreenInsets();
  const [tab, setTab] = useState<LearnTab>('Facts');
  const contentStyle = useMemo(
    () => ({
      paddingBottom: insets.bottom,
      paddingHorizontal: insets.horizontal,
      paddingTop: 16,
    }),
    [insets.bottom, insets.horizontal],
  );

  return (
    <AppBackground source={images.backgroundLibrary} overlay={0.6}>
      <HeaderBar eyebrow="Knowledge base" title="Storm academy" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentStyle}>
        <SegmentedControl items={learnTabs} value={tab} onChange={setTab} />
        {tab === 'Facts' ? <FactsView /> : null}
        {tab === 'Quiz' ? <QuizView /> : null}
        {tab !== 'Facts' && tab !== 'Quiz' ? <BlogView category={tab} /> : null}
      </ScrollView>
    </AppBackground>
  );
}

function FactsView() {
  return (
    <View style={styles.stack}>
      {factSections.map(section => (
        <View key={section.title} style={styles.factPanel}>
          <View style={styles.factHeader}>
            <View style={[styles.accent, {backgroundColor: section.accent}]} />
            <Text style={styles.panelTitle}>{section.title}</Text>
          </View>
          {section.facts.map(fact => (
            <View key={fact} style={styles.factRow}>
              <Text style={styles.factIcon}>⚡</Text>
              <Text style={styles.factText}>{fact}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function QuizView() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const question = quizQuestions[index];
  const progress = `${index + 1}/${quizQuestions.length}`;

  function pickAnswer(optionIndex: number) {
    if (selected !== null) {
      return;
    }

    setSelected(optionIndex);

    if (optionIndex === question.answerIndex) {
      setScore(current => current + 1);
    }
  }

  function nextQuestion() {
    if (index === quizQuestions.length - 1) {
      setFinished(true);
      return;
    }

    setIndex(current => current + 1);
    setSelected(null);
  }

  function restart() {
    setFinished(false);
    setIndex(0);
    setScore(0);
    setSelected(null);
  }

  if (finished) {
    return (
      <View style={styles.quizPanel}>
        <Text style={styles.quizIcon}>🏆</Text>
        <Text style={styles.quizResult}>Score {score}/{quizQuestions.length}</Text>
        <Text style={styles.quizCopy}>Saved places stay in the app, and the quiz can be retaken any time.</Text>
        <PrimaryButton icon="🔁" label="Restart quiz" onPress={restart} />
      </View>
    );
  }

  return (
    <View style={styles.quizPanel}>
      <Text style={styles.quizProgress}>{progress}</Text>
      <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={3} style={styles.quizQuestion}>
        {question.question}
      </Text>
      <View style={styles.options}>
        {question.options.map((option, optionIndex) => {
          const answerShown = selected !== null;
          const correct = optionIndex === question.answerIndex;
          const picked = optionIndex === selected;

          return (
            <Pressable
              accessibilityRole="button"
              key={option}
              onPress={() => pickAnswer(optionIndex)}
              style={[
                styles.option,
                answerShown && correct && styles.optionCorrect,
                answerShown && picked && !correct && styles.optionWrong,
              ]}>
              <Text style={styles.optionLetter}>{String.fromCharCode(65 + optionIndex)}</Text>
              <Text style={styles.optionText}>{option}</Text>
              {answerShown && correct ? <Text style={styles.answerMark}>✅</Text> : null}
            </Pressable>
          );
        })}
      </View>
      <PrimaryButton
        icon="➡️"
        label={index === quizQuestions.length - 1 ? 'Finish' : 'Next'}
        onPress={selected === null ? () => undefined : nextQuestion}
        tone={selected === null ? 'ghost' : 'primary'}
      />
    </View>
  );
}

function BlogView({category}: {category: BlogCategory}) {
  const posts = useMemo(() => blogPosts.filter(post => post.category === category), [category]);

  return (
    <View style={styles.stack}>
      {posts.map(post => (
        <View key={post.id} style={styles.blogPanel}>
          <Text style={styles.blogCategory}>{post.category}</Text>
          <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={2} style={styles.blogTitle}>
            {post.title}
          </Text>
          <Text style={styles.blogStory}>{post.story}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  accent: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  answerMark: {
    fontSize: 16,
  },
  blogCategory: {
    color: colors.active,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  blogPanel: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    padding: 16,
  },
  blogStory: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 10,
  },
  blogTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 26,
    marginTop: 8,
  },
  factHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  factIcon: {
    fontSize: 14,
    marginTop: 2,
  },
  factPanel: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    padding: 16,
  },
  factRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    marginTop: 9,
  },
  factText: {
    color: colors.muted,
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 19,
  },
  option: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 50,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  optionCorrect: {
    backgroundColor: 'rgba(134, 247, 181, 0.18)',
    borderColor: colors.success,
  },
  optionLetter: {
    color: colors.active,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
    width: 20,
  },
  optionText: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 19,
  },
  optionWrong: {
    backgroundColor: 'rgba(255, 123, 139, 0.18)',
    borderColor: colors.danger,
  },
  options: {
    gap: 10,
    marginBottom: 16,
    marginTop: 18,
  },
  panelTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  quizCopy: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
    marginBottom: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  quizIcon: {
    fontSize: 48,
    textAlign: 'center',
  },
  quizPanel: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginTop: 14,
    padding: 16,
  },
  quizProgress: {
    color: colors.active,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  quizQuestion: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 29,
    marginTop: 8,
  },
  quizResult: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 10,
    textAlign: 'center',
  },
  stack: {
    gap: 14,
    marginTop: 14,
  },
});
