# ─────────────────────────────────────────────────────────────────────────────
# MODEL 3 — XGBoost : Teacher Engagement / Churn Prediction
# ─────────────────────────────────────────────────────────────────────────────

import pandas as pd
import numpy as np
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (accuracy_score, classification_report,
                             confusion_matrix, roc_auc_score)
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings("ignore")

print("=" * 60)
print("MODEL 3 — XGBoost Churn Prediction")
print("=" * 60)

# ── 1. Load Data ──────────────────────────────────────────────────────────────
df = pd.read_csv("data/teacher_churn.csv")
print(f"\n✅ Loaded {len(df)} teacher engagement records")
print(f"   Columns: {list(df.columns)}")
print(f"\n   Churn distribution:")
print(f"   Stayed (0): {(df['churned']==0).sum()} teachers")
print(f"   Churned (1): {(df['churned']==1).sum()} teachers")

# ── 2. Feature Engineering ────────────────────────────────────────────────────
print("\n⚙️  Engineering features...")

# Encode teacher_id if present
if 'teacher_id' in df.columns:
    df = df.drop(columns=['teacher_id'])

# Define features and target
FEATURES = [
    'streak_length',
    'days_since_login',
    'modules_completed',
    'total_reflections',
    'avg_word_count',
    'reflection_frequency',
    'sentiment_score',
]

# Only use columns that exist
available = [f for f in FEATURES if f in df.columns]
X = df[available]
y = df['churned']

print(f"   Features used: {available}")
print(f"   Dataset size: {X.shape}")

# ── 3. Train / Test Split ─────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"\n📊 Train size: {len(X_train)} | Test size: {len(X_test)}")

# ── 4. Train XGBoost ──────────────────────────────────────────────────────────
print("\n🤖 Training XGBoost model...")

model = XGBClassifier(
    n_estimators=100,
    max_depth=4,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    use_label_encoder=False,
    eval_metric='logloss',
    random_state=42,
    verbosity=0
)

model.fit(X_train, y_train)
print("✅ Training complete")

# ── 5. Evaluate ───────────────────────────────────────────────────────────────
print("\n📈 Model Performance:")
print("-" * 50)

y_pred      = model.predict(X_test)
y_pred_prob = model.predict_proba(X_test)[:, 1]

accuracy = accuracy_score(y_test, y_pred)
auc      = roc_auc_score(y_test, y_pred_prob)

print(f"  Accuracy : {accuracy:.2%}")
print(f"  AUC-ROC  : {auc:.2f}")
print(f"\n  Classification Report:")
print(classification_report(y_test, y_pred, target_names=['Stayed','Churned']))

# ── 6. Feature Importance ─────────────────────────────────────────────────────
print("\n🔍 Feature Importance (which signals matter most):")
print("-" * 50)

importance = pd.Series(model.feature_importances_, index=available)
importance = importance.sort_values(ascending=False)

for feat, score in importance.items():
    bar = "█" * int(score * 40)
    print(f"  {feat:<25} {score:.3f}  {bar}")

# ── 7. Predict on New Teachers ────────────────────────────────────────────────
print("\n🎯 Churn Risk Predictions (sample teachers):")
print("-" * 50)

sample = X_test.head(8).copy()
sample['churn_probability'] = model.predict_proba(sample)[:, 1].round(2)
sample['risk_level'] = sample['churn_probability'].apply(
    lambda p: '🔴 HIGH'   if p >= 0.7
         else '🟡 MEDIUM' if p >= 0.4
         else '🟢 LOW'
)

for i, row in sample.iterrows():
    print(f"  Teacher {i:>3} | Streak: {int(row.get('streak_length',0)):>3}d | "
          f"Churn prob: {row['churn_probability']:.0%} | {row['risk_level']}")

# ── 8. Save Predictions ───────────────────────────────────────────────────────
df['churn_probability'] = model.predict_proba(X)[:, 1].round(2)
df['risk_level'] = df['churn_probability'].apply(
    lambda p: 'HIGH' if p >= 0.7 else 'MEDIUM' if p >= 0.4 else 'LOW'
)
df.to_csv("data/churn_predictions.csv", index=False)
print("\n✅ Saved: data/churn_predictions.csv")

# ── 9. Visualisations ─────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Chart 1 — Feature Importance
importance.plot(kind='barh', ax=axes[0],
    color='#378ADD', edgecolor='white')
axes[0].set_title('XGBoost — Feature Importance', fontweight='bold')
axes[0].set_xlabel('Importance Score')
axes[0].grid(axis='x', alpha=0.3)
axes[0].invert_yaxis()

# Chart 2 — Churn Risk Distribution
risk_counts = df['risk_level'].value_counts()
colors = {'HIGH':'#E11D48','MEDIUM':'#BA7517','LOW':'#1D9E75'}
risk_colors = [colors.get(r,'#378ADD') for r in risk_counts.index]
risk_counts.plot(kind='bar', ax=axes[1],
    color=risk_colors, edgecolor='white', width=0.6)
axes[1].set_title('Teacher Churn Risk Distribution', fontweight='bold')
axes[1].set_xlabel('Risk Level'); axes[1].set_ylabel('Number of Teachers')
axes[1].set_xticklabels(axes[1].get_xticklabels(), rotation=0)
axes[1].grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.savefig("data/churn_analysis.png", dpi=150, bbox_inches='tight')
plt.close()
print("✅ Saved: data/churn_analysis.png")

print("\n" + "=" * 60)
print("MODEL 3 COMPLETE ✅")
print("=" * 60)
