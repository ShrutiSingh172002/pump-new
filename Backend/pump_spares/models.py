from django.db import models


class PumpMake(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']


class PumpModel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']


class PumpSize(models.Model):
    size = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.size
    
    class Meta:
        ordering = ['size']


class PartNumber(models.Model):
    part_no = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.part_no
    
    class Meta:
        ordering = ['part_no']


class PartName(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']


class MaterialOfConstruction(models.Model):
    pump_make = models.ForeignKey(PumpMake, on_delete=models.CASCADE, related_name='materials')
    pump_model = models.ForeignKey(PumpModel, on_delete=models.CASCADE, related_name='materials')
    pump_size = models.ForeignKey(PumpSize, on_delete=models.CASCADE, related_name='materials')
    part_number = models.ForeignKey(PartNumber, on_delete=models.CASCADE, related_name='materials')
    part_name = models.ForeignKey(PartName, on_delete=models.CASCADE, related_name='materials')
    
    moc = models.CharField(max_length=100, verbose_name="Material of Construction")
    qty_available = models.PositiveIntegerField(default=0)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    drawing = models.CharField(max_length=255, blank=True, null=True)
    ref_part_list = models.CharField(max_length=255, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.pump_make.name} {self.pump_model.name} {self.pump_size.size} {self.part_number.part_no} {self.part_name.name} - {self.moc}"
    
    class Meta:
        ordering = ['pump_make__name', 'pump_model__name', 'pump_size__size', 'part_number__part_no', 'part_name__name', 'moc']
        unique_together = ['pump_make', 'pump_model', 'pump_size', 'part_number', 'part_name', 'moc']
        verbose_name = "Material of Construction"
        verbose_name_plural = "Materials of Construction"
