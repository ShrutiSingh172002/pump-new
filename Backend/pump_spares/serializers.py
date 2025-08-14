from rest_framework import serializers
from .models import PumpMake, PumpModel, PumpSize, PartNumber, PartName, MaterialOfConstruction


class PumpMakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PumpMake
        fields = ['id', 'name']


class PumpModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PumpModel
        fields = ['id', 'name']


class PumpSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PumpSize
        fields = ['id', 'size']


class PartNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartNumber
        fields = ['id', 'part_no']


class PartNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartName
        fields = ['id', 'name']


class MaterialOfConstructionSerializer(serializers.ModelSerializer):
    pump_make_name = serializers.CharField(source='pump_make.name', read_only=True)
    pump_model_name = serializers.CharField(source='pump_model.name', read_only=True)
    pump_size_value = serializers.CharField(source='pump_size.size', read_only=True)
    part_number_value = serializers.CharField(source='part_number.part_no', read_only=True)
    part_name_value = serializers.CharField(source='part_name.name', read_only=True)
    
    class Meta:
        model = MaterialOfConstruction
        fields = [
            'id', 'moc', 'pump_make', 'pump_model', 'pump_size', 'part_number', 'part_name',
            'pump_make_name', 'pump_model_name', 'pump_size_value', 'part_number_value', 'part_name_value',
            'qty_available', 'unit_price', 'drawing', 'ref_part_list'
        ]


class PumpSparesFilterSerializer(serializers.Serializer):
    """Serializer for filtering pump spares based on selected criteria"""
    pump_make = serializers.IntegerField(required=False)
    pump_model = serializers.IntegerField(required=False)
    pump_size = serializers.IntegerField(required=False)
    part_number = serializers.IntegerField(required=False)
    part_name = serializers.IntegerField(required=False)
    moc = serializers.IntegerField(required=False)
