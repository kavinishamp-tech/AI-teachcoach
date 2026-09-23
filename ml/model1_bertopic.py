# ─────────────────────────────────────────────────────────────────────────────
# MODEL 1 — BERTopic : Pedagogical Gap Detection from Reflection Text
# ─────────────────────────────────────────────────────────────────────────────

import pandas as pd
import numpy as np
import re
from bertopic import BERTopic
from sklearn.feature_extraction.text import CountVectorizer
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings("ignore")

print("=" * 60)
print("MODEL 1 — BERTopic Gap Detection")
print("=" * 60)

# ── 1. Load Data ──────────────────────────────────────────────────────────────
df = pd.read_csv("data/teacher_reflections.csv")
print(f"\n✅ Loaded {len(df)} reflection entries")
print(f"\nSample entry:\n  {df['reflection_text'].iloc[0]}")

# ── 2. Preprocess ─────────────────────────────────────────────────────────────
def preprocess(text):
    text = str(text).lower().strip()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text

df['clean_text'] = df['reflection_text'].apply(preprocess)
docs = df['clean_text'].tolist()
print(f"\n📝 Preprocessed {len(docs)} documents")

# ── 3. Train BERTopic ─────────────────────────────────────────────────────────
print("\n🤖 Training BERTopic model (1-2 minutes)...")

vectorizer = CountVectorizer(stop_words="english", min_df=2, ngram_range=(1, 2))
topic_model = BERTopic(vectorizer_model=vectorizer, nr_topics="auto", verbose=False)
topics, probs = topic_model.fit_transform(docs)
print("✅ Training complete")

# ── 4. Show Topics ────────────────────────────────────────────────────────────
print("\n📊 Discovered Topics:")
print("-" * 50)
topic_info = topic_model.get_topic_info()
topic_info = topic_info[topic_info['Topic'] != -1]
for _, row in topic_info.iterrows():
    print(f"  Topic {row['Topic']:>2} | Count: {row['Count']:>3} | {row['Name']}")

# ── 5. Gap Labels ─────────────────────────────────────────────────────────────
GAP_LABELS = {
    0: "Lesson pacing",
    1: "Student engagement",
    2: "Classroom management",
    3: "Differentiated instruction",
    4: "Inquiry moments",
}

def get_gap_label(topic_id):
    if topic_id == -1:
        return "General"
    return GAP_LABELS.get(topic_id % len(GAP_LABELS), f"Topic {topic_id}")

df['detected_topic'] = topics
df['gap_label']      = df['detected_topic'].apply(get_gap_label)

# ── 6. Per Teacher Gap Analysis ───────────────────────────────────────────────
print("\n👩‍🏫 Top Gap Per Teacher:")
print("-" * 50)
teacher_gaps = df.groupby(['teacher_id','gap_label']).size().reset_index(name='count')
top_gaps     = teacher_gaps.sort_values('count', ascending=False).groupby('teacher_id').first().reset_index()
top_gaps.columns = ['teacher_id','primary_gap','mention_count']
print(top_gaps.to_string(index=False))

# ── 7. Confidence Scores ──────────────────────────────────────────────────────
print("\n📈 Gap Confidence Scores:")
print("-" * 50)
gap_counts     = df['gap_label'].value_counts()
gap_confidence = (gap_counts / len(df)).round(2)
for gap, score in gap_confidence.items():
    bar = "█" * int(score * 20)
    print(f"  {gap:<35} {score:.2f}  {bar}")

# ── 8. Save ───────────────────────────────────────────────────────────────────
df.to_csv("data/reflection_with_topics.csv", index=False)
top_gaps.to_csv("data/teacher_gap_profiles.csv", index=False)
print("\n✅ Saved: data/reflection_with_topics.csv")
print("✅ Saved: data/teacher_gap_profiles.csv")

# ── 9. Chart ──────────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(10, 5))
gap_counts.plot(kind='bar', ax=ax,
    color=['#378ADD','#1D9E75','#BA7517','#8B5CF6','#E11D48'],
    edgecolor='white', width=0.6)
ax.set_title('TeachCoach — Detected Pedagogical Gaps (BERTopic)', fontsize=14, fontweight='bold')
ax.set_xlabel('Gap Category'); ax.set_ylabel('Number of Reflections')
ax.set_xticklabels(ax.get_xticklabels(), rotation=30, ha='right')
ax.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig("data/gap_distribution.png", dpi=150, bbox_inches='tight')
plt.close()
print("✅ Saved: data/gap_distribution.png")

print("\n" + "=" * 60)
print("MODEL 1 COMPLETE ✅")
print("=" * 60)
