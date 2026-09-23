# ─────────────────────────────────────────────────────────────────────────────
# TeachCoach — Full ML Pipeline Runner
# Run this file to execute all 3 models in sequence
# ─────────────────────────────────────────────────────────────────────────────

import subprocess
import sys
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

print("\n" + "🚀 " * 20)
print("  TEACHCOACH — FULL ML PIPELINE")
print("🚀 " * 20)

steps = [
    ("MODEL 1 — BERTopic Gap Detection",          "model1_bertopic.py"),
    ("MODEL 2 — Collaborative Filtering",          "model2_collaborative_filtering.py"),
    ("MODEL 3 — XGBoost Churn Prediction",         "model3_xgboost.py"),
]

for i, (name, script) in enumerate(steps, 1):
    print(f"\n{'─'*60}")
    print(f"  STEP {i}: {name}")
    print(f"{'─'*60}\n")
    result = subprocess.run([sys.executable, script], capture_output=False)
    if result.returncode != 0:
        print(f"\n❌ Error in {script} — check the output above")
        sys.exit(1)

print("\n" + "✅ " * 20)
print("  ALL 3 MODELS COMPLETE")
print("✅ " * 20)
print("\nOutput files saved in ml/data/:")
print("  • reflection_with_topics.csv")
print("  • teacher_gap_profiles.csv")
print("  • pathway_recommendations.csv")
print("  • churn_predictions.csv")
print("  • gap_distribution.png")
print("  • pathway_analysis.png")
print("  • churn_analysis.png")
