# Traducir notación a NumPy: la misma idea escrita de dos formas
import numpy as np

a = np.array([1.0, 2.0, 3.0])
b = np.array([4.0, 5.0, 6.0])
A = np.array([[1.0, 2.0], [3.0, 4.0]])

print("∑ aᵢbᵢ   (a·b)  ->", a @ b)
print("‖a‖₂            ->", np.linalg.norm(a))
print("Aᵀ              ->", A.T.tolist())
print("A⁻¹             ->", np.linalg.inv(A).round(2).tolist())
print("det(A)          ->", round(np.linalg.det(A), 6))
