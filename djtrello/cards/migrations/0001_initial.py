# Generated by Django 3.1.2 on 2020-10-25 19:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lists', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(db_index=True, editable=False, verbose_name='order')),
                ('name', models.CharField(max_length=100)),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cards', to='lists.list')),
            ],
            options={
                'ordering': ('order',),
                'abstract': False,
            },
        ),
    ]
