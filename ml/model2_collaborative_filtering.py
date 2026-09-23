# ─────────────────────────────────────────────────────────────────────────────
# MODEL 2 — Collaborative Filtering : Pathway Recommendation
# ─────────────────────────────────────────────────────────────────────────────

import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings("ignore")

print("=" * 60)
print("MODEL 2 — Collaborative Filtering Recommendation")
print("=" * 60)

# ── 1. Load Data ──────────────────────────────────────────────────────────────
df       = pd.read_csv("data/teacher_pathways.csv")
profiles = pd.read_csv("data/teacher_gap_profiles.csv")

print(f"\n✅ Loaded {len(df)} pathway interactions")
print(f"✅ Loaded {len(profiles)} teacher gap profiles")
print(f"\nSample interaction:")
print(f"  {df.iloc[0].to_dict()}")

# ── 2. Build Teacher-Pathway Matrix ───────────────────────────────────────────
print("\n📊 Building teacher-pathway matrix...")

# Pivot: rows = teachers, columns = pathways, values = engagement score
matrix = df.pivot_table(
    index='teacher_id',
    columns='pathway_name',
    values='engagement_score',
    aggfunc='mean'
).fillna(0)

print(f"   Matrix shape: {matrix.shape[0]} teachers × {matrix.shape[1]} pathways")
print(f"\n   Pathways available:")
for p in matrix.columns:
    print(f"     • {p}")

# ── 3. Compute Teacher Similarity ─────────────────────────────────────────────
print("\n🔍 Computing teacher similarity (cosine similarity)...")

similarity_matrix = cosine_similarity(matrix)
similarity_df     = pd.DataFrame(
    similarity_matrix,
    index=matrix.index,
    columns=matrix.index
)
print("   ✅ Similarity matrix computed")

# ── 4. Recommendation Function ────────────────────────────────────────────────
def recommend_pathways(teacher_id, n_recommendations=3):
    """
    Given a teacher_id, find similar teachers and
    recommend pathways they engaged with highly.
    """
    if teacher_id not in similarity_df.index:
        # Cold start — return top pathways overall
        top = df.groupby('pathway_name')['engagement_score'].mean().sort_values(ascending=False)
        return top.head(n_recommendations).index.tolist()

    # Get top 5 similar teachers (excluding self)
    similar = similarity_df[teacher_id].drop(teacher_id).sort_values(ascending=False).head(5)
    similar_teachers = similar.index.tolist()

    # Get pathways current teacher has NOT done
    done_pathways = df[df['teacher_id'] == teacher_id]['pathway_name'].tolist()

    # Score pathways by similar teachers' engagement
    scores = {}
    for sim_teacher in similar_teachers:
        sim_data = df[df['teacher_id'] == sim_teacher]
        for _, row in sim_data.iterrows():
            pathway = row['pathway_name']
            if pathway not in done_pathways:
                scores[pathway] = scores.get(pathway, 0) + row['engagement_score']

    if not scores:
        # Fall back to top rated
        top = df[~df['pathway_name'].isin(done_pathways)]
        top = top.groupby('pathway_name')['engagement_score'].mean().sort_values(ascending=False)
        return top.head(n_recommendations).index.tolist()

    sorted_pathways = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [p[0] for p in sorted_pathways[:n_recommendations]]

# ── 5. Generate Recommendations ───────────────────────────────────────────────
print("\n🎯 Generating recommendations for all teachers:")
print("-" * 50)

all_teachers = matrix.index.tolist()
recommendations = []

for teacher in all_teachers[:10]:  # show first 10
    recs = recommend_pathways(teacher, n_recommendations=3)
    recommendations.append({
        'teacher_id': teacher,
        'recommendation_1': recs[0] if len(recs) > 0 else 'N/A',
        'recommendation_2': recs[1] if len(recs) > 1 else 'N/A',
        'recommendation_3': recs[2] if len(recs) > 2 else 'N/A',
    })
    print(f"  {teacher} → {recs[0] if recs else 'N/A'}")

# ── 6. Full Recommendations with Gap Context ──────────────────────────────────
print("\n🔗 Recommendations with gap context:")
print("-" * 50)

for _, profile in profiles.head(5).iterrows():
    teacher = profile['teacher_id']
    gap     = profile['primary_gap']
    recs    = recommend_pathways(teacher)
    print(f"  {teacher} | Gap: {gap:<35} → Recommend: {recs[0] if recs else 'N/A'}")

# ── 7. Save Results ───────────────────────────────────────────────────────────
rec_df = pd.DataFrame(recommendations)
rec_df.to_csv("data/pathway_recommendations.csv", index=False)
print("\n✅ Saved: data/pathway_recommendations.csv")

# ── 8. Visualisation — Pathway Popularity ─────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Chart 1 — Average engagement per pathway
avg_engagement = df.groupby('pathway_name')['engagement_score'].mean().sort_values(ascending=False)
avg_engagement.plot(kind='bar', ax=axes[0],
    color='#378ADD', edgecolor='white', width=0.6)
axes[0].set_title('Average Engagement Score per Pathway', fontweight='bold')
axes[0].set_xlabel('Pathway'); axes[0].set_ylabel('Average Score')
axes[0].set_xticklabels(axes[0].get_xticklabels(), rotation=30, ha='right')
axes[0].grid(axis='y', alpha=0.3)

# Chart 2 — Completion rate per pathway
completion = df.groupby('pathway_name')['completed'].mean().sort_values(ascending=False) * 100
completion.plot(kind='bar', ax=axes[1],
    color='#1D9E75', edgecolor='white', width=0.6)
axes[1].set_title('Pathway Completion Rate (%)', fontweight='bold')
axes[1].set_xlabel('Pathway'); axes[1].set_ylabel('Completion %')
axes[1].set_xticklabels(axes[1].get_xticklabels(), rotation=30, ha='right')
axes[1].grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.savefig("data/pathway_analysis.png", dpi=150, bbox_inches='tight')
plt.close()
print("✅ Saved: data/pathway_analysis.png")

print("\n" + "=" * 60)
print("MODEL 2 COMPLETE ✅")
print("=" * 60)
