from django.contrib import admin
from .models import PumpMake, PumpModel, PumpSize, PartNumber, PartName, MaterialOfConstruction


@admin.register(PumpMake)
class PumpMakeAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']
    ordering = ['name']


@admin.register(PumpModel)
class PumpModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']
    ordering = ['name']


@admin.register(PumpSize)
class PumpSizeAdmin(admin.ModelAdmin):
    list_display = ['size', 'created_at']
    search_fields = ['size']
    ordering = ['size']


@admin.register(PartNumber)
class PartNumberAdmin(admin.ModelAdmin):
    list_display = ['part_no', 'created_at']
    search_fields = ['part_no']
    ordering = ['part_no']


@admin.register(PartName)
class PartNameAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']
    ordering = ['name']


@admin.register(MaterialOfConstruction)
class MaterialOfConstructionAdmin(admin.ModelAdmin):
    list_display = ['moc', 'pump_make', 'pump_model', 'pump_size', 'part_number', 'part_name', 'qty_available', 'unit_price', 'updated_at']
    list_filter = ['pump_make', 'pump_model', 'pump_size', 'part_number', 'part_name', 'qty_available', 'created_at']
    search_fields = ['moc', 'pump_make__name', 'pump_model__name', 'pump_size__size', 'part_number__part_no', 'part_name__name']
    ordering = ['pump_make__name', 'pump_model__name', 'pump_size__size', 'part_number__part_no', 'part_name__name', 'moc']
    list_editable = ['qty_available', 'unit_price']
    
    fieldsets = (
        ('Part Information', {
            'fields': ('pump_make', 'pump_model', 'pump_size', 'part_number', 'part_name')
        }),
        ('Material Details', {
            'fields': ('moc', 'qty_available', 'unit_price', 'drawing', 'ref_part_list')
        }),
    )
