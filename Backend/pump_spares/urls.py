from django.urls import path
from . import views

urlpatterns = [
    path('pump-makes/', views.PumpMakeListView.as_view(), name='pump-makes'),
    path('pump-models/', views.PumpModelListView.as_view(), name='pump-models'),
    path('pump-sizes/', views.PumpSizeListView.as_view(), name='pump-sizes'),
    path('part-numbers/', views.PartNumberListView.as_view(), name='part-numbers'),
    path('part-names/', views.PartNameListView.as_view(), name='part-names'),
    path('materials/', views.MaterialOfConstructionListView.as_view(), name='materials'),
    
    path('filtered-options/', views.get_filtered_options, name='filtered-options'),
    path('materials-for-part/', views.get_materials_for_part, name='materials-for-part'),
    path('material/<int:material_id>/', views.get_material_by_id, name='material-detail'),
    path('generate-receipt/', views.generate_receipt, name='generate-receipt'),
]
