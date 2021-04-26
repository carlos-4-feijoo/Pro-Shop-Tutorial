from django.urls import path
from base.views import product_views as views


urlpatterns = [
    #path('', views.getProducts, name="products"),
    # path('create/', views.createProduct, name="product-create"),  # 3
    #path('upload/', views.uploadImage, name="image-upload"),
    # path('<str:pk>/reviews/', views.createProductReview, name="create-review"),  # 5
    # path('top/', views.getTopProducts, name="top-products"),  # 6
    # path('<str:pk>/', views.getProduct, name="product"),  # 0 1
    # path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),  # 2
    # path('update/<str:pk>/', views.updateProduct, name="product-update"),  # 4

    path('', views.productView, name='product-view'),
    #path('<str:type>/', views.productView, name='product-view-short'),
]
